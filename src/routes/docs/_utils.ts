import type { Locals } from '$lib/types';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import faunadb from 'faunadb';
import SnowflakeId from 'snowflake-id';
import { customFetch } from './_fauna-utils';
import type { Document, PostDocumentInput, PutDocumentInput } from './_typings';

const { Create, Collection, Ref, Get } = faunadb.query;

async function getDocumentFromStorage(documentId): Promise<Document> {
	const faunaClient = new faunadb.Client({
		secret: FAUNA_KEY,
		fetch: customFetch,
	});

	const result: { data: Document } = await faunaClient.query(
		Get(Ref(Collection('Documents'), documentId))
	);

	return result.data;
}

export async function getDocumentByRequest(
	request: ServerRequest<Locals>
): Promise<Document | undefined> {
	let document: Document;
	const { documentId } = request.params;

	if (documentId) {
		/* try to get document from cache */
		try {
			const cached = await DOCUMENTS_KV.get(documentId, { type: 'json' });
			if (cached !== null) {
				document = cached as Document;
			}
		} catch {
			/* ignore error on JSON.parse */
		}

		// if document is not found on cache
		// or user requesting the document is the author(we should take document from storage instead of cache)
		if (!document || document.authorId === request.locals.user.id) {
			// try to get from data storage
			try {
				document = await getDocumentFromStorage(documentId);
				console.log('data from storage. document');
				console.log(JSON.stringify(document));
			} catch {
				/* catch 404 err */
			}
		}
	}

	return document;
}

export function validateDocumentInputOrThrow(
	document: PostDocumentInput | PutDocumentInput
): void | never {
	const { isEncrypted, title, content } = document;
	if (typeof isEncrypted !== 'boolean')
		throw new Error('Bad isEncrypted param. Should be boolean.');
	if (typeof title !== 'string') throw new Error('Bad title param. Should be string.');
	if (typeof content !== 'object') throw new Error('Bad content param. Should be object.');
}

export async function updateDocumentAndReturn(document: Document): Promise<Document> {
	validateDocumentInputOrThrow(document);

	// todo update on storage
	await DOCUMENTS_KV.put(document.documentId, JSON.stringify(document));

	return document;
}

export async function createDocumentAndReturn(
	request: ServerRequest<Locals, PostDocumentInput>
): Promise<Document> {
	validateDocumentInputOrThrow(request.body);

	const { isEncrypted, title, content, author } = request.body;

	const faunaClient = new faunadb.Client({
		secret: FAUNA_KEY,
		fetch: customFetch,
	});

	// todo generate mid by cloudflare location?
	const snowflake = new SnowflakeId();

	const document: Document = {
		documentId: snowflake.generate({ compact: true }),
		authorId: request.locals.user.id,
		isEncrypted,
		title,
		author: author ?? '',
		content,
	};

	// post to storage
	await faunaClient.query(
		Create(Ref(Collection('Documents'), document.documentId), { data: document })
	);

	// put to cache
	await DOCUMENTS_KV.put(document.documentId, JSON.stringify(document));

	return document;
}

export function notFoundResponse(): EndpointOutput {
	return {
		status: 404,
		body: {
			success: false,
			message: 'Document is not found',
		},
	};
}

export function documentResponse(document: Document, isOwner: boolean): EndpointOutput<any> {
	return {
		status: 200,
		body: {
			success: true,
			data: { document, isOwner },
		},
	};
}
