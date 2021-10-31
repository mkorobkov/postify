<script context="module" lang="ts">
	export type BubbleMenuState = {
		bold?: boolean;
		italic?: boolean;
		headingOne?: boolean;
		headingTwo?: boolean;
		quote?: boolean;
	};

	export function calcBubbleMenuState(editor: Editor): BubbleMenuState {
		return {
			bold: editor?.isActive('bold'),
			italic: editor?.isActive('italic'),
			headingOne: editor?.isActive('heading', { level: 1 }),
			headingTwo: editor?.isActive('heading', { level: 2 }),
			quote: editor?.isActive('blockquote'),
		};
	}
</script>

<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import BoldIcon from '../assets/bold.svg?component';
	import ItalicIcon from '../assets/italic.svg?component';
	import H1Icon from '../assets/h1.svg?component';
	import H2Icon from '../assets/h2.svg?component';
	import QuoteIcon from '../assets/quote.svg?component';

	export let ref;
	export let editor: Editor;
	export let state: BubbleMenuState = {};
</script>

<div bind:this={ref} class:ready={!!editor}>
	<button type="button" class:active={state.bold} on:click={() => editor.commands.toggleBold()}
		><BoldIcon /></button
	>
	<button type="button" class:active={state.italic} on:click={() => editor.commands.toggleItalic()}
		><ItalicIcon /></button
	>
	<button
		type="button"
		class:active={state.headingOne}
		on:click={() => editor.commands.toggleHeading({ level: 1 })}><H1Icon /></button
	>
	<button
		type="button"
		class:active={state.headingTwo}
		on:click={() => editor.commands.toggleHeading({ level: 2 })}><H2Icon /></button
	>
	<button
		type="button"
		class:active={state.quote}
		on:click={() => editor.commands.toggleBlockquote()}><QuoteIcon /></button
	>
</div>

<style lang="less">
	div {
		position: absolute;
		visibility: hidden;
		font-size: 0;
		background-color: #1d1d1d;
		border-radius: 6px;
		padding: 8px;
		display: grid;
		gap: 4px;
		grid-auto-flow: column;

		&.ready {
			position: relative;
		}
	}

	button {
		cursor: pointer;
		background-color: transparent;
		transition: background-color 0.1s;
		width: 26px;
		height: 26px;
		border-radius: 3px;

		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
		}

		&.active {
			background-color: rgba(255, 255, 255, 0.9);

			:global(& > svg path) {
				fill: rgba(0, 0, 0, 0.8);
			}
		}
	}
</style>
