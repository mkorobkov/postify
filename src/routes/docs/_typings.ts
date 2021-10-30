import type { JSONContent } from '@tiptap/core';

interface GetDocumentErrorResponse {
	success: false;
	message: string;
}

interface GetDocumentSuccessResponse {
	success: true;
	data: GetDocumentData;
}

export type GetDocumentResponse = GetDocumentErrorResponse | GetDocumentSuccessResponse;

export interface GetDocumentData {
	isOwner: boolean;
	document: Document;
}

export interface Document {
	documentId: string;
	authorId: string;
	isEncrypted: boolean;
	/* if encrypted all the values below should be encrypted on the client */
	title: string;
	author: string;
	content: TipTapJSONContent;
}

export type TipTapJSONContent = JSONContent;

export type PostDocumentInput = Omit<Document, 'documentId' | 'authorId'>;
