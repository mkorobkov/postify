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
	title: string;
	author: string;
	content: TipTapJSONContent;
}

export type TipTapJSONContent = JSONContent;