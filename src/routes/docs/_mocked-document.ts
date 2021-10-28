import type { TipTapJSONContent } from './_typings';

export const mockedDocument: TipTapJSONContent = {
	type: 'doc',
	content: [
		{
			type: 'paragraph',
			content: [
				{
					type: 'text',
					text: 'My '
				},
				{
					type: 'text',
					marks: [
						{
							type: 'bold'
						}
					],
					text: 'first'
				},
				{
					type: 'text',
					text: ' title'
				}
			]
		},
		{
			type: 'paragraph',
			content: [
				{
					type: 'text',
					text: 'And '
				},
				{
					type: 'text',
					marks: [
						{
							type: 'bold'
						}
					],
					text: 'the '
				},
				{
					type: 'text',
					marks: [
						{
							type: 'bold'
						},
						{
							type: 'italic'
						}
					],
					text: 'next'
				},
				{
					type: 'text',
					text: ' paragraph'
				}
			]
		},
		{
			type: 'paragraph',
			content: [
				{
					type: 'text',
					text: 'My first title'
				}
			]
		},
		{
			type: 'paragraph'
		}
	]
};
