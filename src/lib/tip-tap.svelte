<script lang="ts">
	import type { TipTapJSONContent } from 'src/routes/docs/_typings';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { afterUpdate, onDestroy, onMount } from 'svelte';

	export let content: TipTapJSONContent;
	export let editable = true;

	let element;
	let editor: Editor | undefined;

	$: editor?.commands.setContent(content);
	$: editor?.setEditable(editable);

	onMount(() => {
		editor = new Editor({
			editable,
			element,
			extensions: [StarterKit],
			content,
			onUpdate({ editor }) {
				content = editor.getJSON() as TipTapJSONContent;
			}
		});
	});

	onDestroy(() => {
		editor?.destroy();
	});

	afterUpdate(() => {
		console.log('TipTap after update...');
	});
</script>

<div class="wrapper">
	<div class="element-wrapper" bind:this={element} />
</div>

{#if editor}
	<pre class="json-output">
      {JSON.stringify(editor.getJSON(), null, 2)}
    </pre>
{/if}

<style>
	.wrapper {
		border: 1px solid #ccc;
		max-height: 200px;
		display: inline-flex;
		flex-direction: column;
	}

	.wrapper:focus-within {
		border: 1px solid red;
	}

	.element-wrapper {
		padding: 1rem;
		flex: 1 1 0%;
		resize: both;
		overflow: auto;
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

	.json-output,
	.html-output {
		max-height: 200px;
		overflow: hidden;
		overflow-y: auto;
		border: 1px solid #ccc;
	}
</style>
