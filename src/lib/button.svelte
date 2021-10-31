<script lang="ts">
	export let disabled: boolean = undefined;
</script>

<button on:click {disabled} class:button={true} class={$$props.class} {...$$restProps}
	><slot /></button
>

<style lang="less">
	button {
		user-select: none;
		width: 100%;
		white-space: nowrap;
		cursor: pointer;
		padding: 8px 16px;
		outline: none;
		background-color: transparent;
		border: 2px solid #000000;

		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		text-transform: uppercase;
		color: #000000;
		transition: opacity 0.1s;

		display: grid;
		align-content: center;
		justify-content: center;
		text-decoration: none;
		text-align: center;

		&:disabled {
			touch-action: none;
			cursor: default;
			opacity: 0.6;
		}
	}
</style>
