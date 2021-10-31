import type { JSONContent } from '@tiptap/core';

interface ErrorResponse {
	success: false;
	message: string;
}

export interface DocumentInfo {
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

interface PostDocumentSuccessResponse {
	success: true;
	data: DocumentInfo;
}

export type PostDocumentResponse = ErrorResponse | PostDocumentSuccessResponse;

interface GetDocumentSuccessResponse {
	success: true;
	data: DocumentInfo;
}

export type GetDocumentResponse = ErrorResponse | GetDocumentSuccessResponse;

interface PutDocumentSuccessResponse {
	success: true;
	data: DocumentInfo;
}

export type PutDocumentResponse = ErrorResponse | PutDocumentSuccessResponse;
