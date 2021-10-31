import type { DocumentInfo, PutDocumentInput, PutDocumentResponse } from 'src/routes/docs/_typings';

export async function updateDocument(
	data: PutDocumentInput,
	documentId: string
): Promise<DocumentInfo> {
	const res = await fetch(`/docs/${documentId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	const result = (await res.json()) as PutDocumentResponse;

	if (result.success === false) {
		throw new Error(result?.message);
	}

	return result.data;
}
