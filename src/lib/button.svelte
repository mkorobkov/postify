<script lang="ts">
	export let disabled: boolean = undefined;
	export let href: string | undefined = undefined;
</script>

{#if href}
	<a {href} class="button" class:disabled><slot /></a>
{:else}
	<button on:click {disabled} class:button={true} class={$$props.class} {...$$restProps}
		><slot /></button
	>
{/if}

<style lang="less">
	.button {
		white-space: nowrap;
		cursor: pointer;
		padding: 8px 16px;
		outline: none;
		background-color: transparent;
		border: 2px solid #000000;

		font-family: Roboto, sans-serif;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 19px;
		text-transform: uppercase;
		color: #000000;
		transition: opacity 0.1s;

		display: inline-grid;
		align-content: center;
		justify-content: center;
		text-decoration: none;
		text-align: center;

		&.disabled,
		&:disabled {
			cursor: default;
			opacity: 0.6;
		}
	}
</style>
