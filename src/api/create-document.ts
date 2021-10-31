import type {
	DocumentInfo,
	PostDocumentInput,
	PostDocumentResponse,
} from '../routes/docs/_typings';

export async function createDocument(data: PostDocumentInput): Promise<DocumentInfo> {
	const res = await fetch('/docs', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	const result = await res.json<PostDocumentResponse>();

	if (result.success === false) {
		throw new Error(result?.message);
	}

	return result.data;
}
