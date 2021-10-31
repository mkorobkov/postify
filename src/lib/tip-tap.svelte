<script lang="ts">
	import type { TipTapJSONContent } from 'src/routes/docs/_typings';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import Placeholder from '@tiptap/extension-placeholder';
	import { onDestroy, onMount } from 'svelte';
	import EditorBubbleMenu, {
		BubbleMenuState,
		calcBubbleMenuState,
	} from './editor-bubble-menu.svelte';

	export let content: TipTapJSONContent;
	export let autoFocus = false;

	let element;
	let bubbleMenuElement;
	let editor: Editor | undefined;

	let bubbleMenuState: BubbleMenuState;

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
				BubbleMenu.configure({
					element: bubbleMenuElement,
					tippyOptions: {
						onShow() {
							bubbleMenuState = calcBubbleMenuState(editor);
						},
					},
				}),
			],
			content,
			onUpdate: async ({ editor }) => {
				content = editor.getJSON() as TipTapJSONContent;
				bubbleMenuState = calcBubbleMenuState(editor);
			},
		});
	});

	onDestroy(() => {
		editor?.destroy();
	});
</script>

<div class="wrapper">
	<div class="element-wrapper" bind:this={element} />
	<EditorBubbleMenu bind:ref={bubbleMenuElement} {editor} state={bubbleMenuState} />
</div>

<style lang="less">
	.wrapper {
		display: grid;
	}

	.element-wrapper {
		display: grid;
		width: 100%;
	}

	.element-wrapper > :global(.ProseMirror) {
		outline: 0;
		display: grid;
		gap: 12px;
		align-content: flex-start;
	}
	.element-wrapper :global(.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		float: left;
		color: rgba(0, 0, 0, 0.25);
		pointer-events: none;
		height: 0;
	}
</style>
