<script lang="ts">
	import type { TipTapJSONContent } from 'src/routes/docs/_typings';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import Placeholder from '@tiptap/extension-placeholder';
	import { onDestroy, onMount } from 'svelte';
	import EditorBubbleMenu from './editor-bubble-menu.svelte';

	export let content: TipTapJSONContent;
	export let autoFocus = false;

	let element;
	let bubbleMenuElement;
	let editor: Editor | undefined;

	let bubbleRerender = {};

	$: async () => {
		if (editor) {
			const cursorPosition = editor.view.state.selection.anchor;
			editor.commands.setContent(content);
			editor.commands.setTextSelection(cursorPosition); // prevent moving cursor to the end
		}
	};

	onMount(() => {
		editor = new Editor({
			element,
			autofocus: autoFocus ? 'end' : false,
			extensions: [
				StarterKit,
				Placeholder.configure({ placeholder: 'Write something...' }),
				BubbleMenu.configure({ element: bubbleMenuElement, tippyOptions: { delay: 3000 } }),
			],
			content,
			onUpdate: async ({ editor }) => {
				content = editor.getJSON() as TipTapJSONContent;
				bubbleRerender = {}; // after editor state change we should update bubble menu state
			},
			// onTransaction: () => {},
		});
	});

	onDestroy(() => {
		editor?.destroy();
	});
</script>

<div class="wrapper">
	<div class="element-wrapper" bind:this={element} />
	<EditorBubbleMenu bind:ref={bubbleMenuElement} {editor} rerender={bubbleRerender} />
</div>

<style lang="less">
	:global(.ProseMirror) {
		display: grid;
		gap: 12px;
	}
	:global(.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		float: left;
		color: #adb5bd;
		pointer-events: none;
		height: 0;
	}

	.wrapper {
		// border: 1px solid #ccc;
		display: grid;
	}

	.wrapper:focus-within {
		// border: 1px solid red;
	}

	.element-wrapper {
		height: auto;
		width: 100%;
		// padding: 1rem;
		// flex: 1 1 0%;
		// resize: both;
		// overflow: auto;
	}

	.element-wrapper :global(p:first-of-type) {
		margin-top: 0;
	}

	.element-wrapper :global(p:last-of-type) {
		margin-bottom: 0;
	}

	.element-wrapper > :global(.ProseMirror) {
		outline: 0;
	}
</style>
