<!-- Tooken from here: https://codepen.io/rhysforyou/pen/MvOgoQ -->
<div class="container">
	<span class="material spinner" />
</div>

<style lang="less">
	.container {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.3);
		cursor: progress;
		z-index: 9;
	}
	.spinner::after {
		content: '';
		box-sizing: border-box;
		width: 40px;
		height: 40px;
		position: absolute;
		top: calc(50% - 20px);
		left: calc(50% - 20px);
		border-radius: 50%;
	}
	.spinner.material::after {
		border-top: 4px solid rgba(0, 0, 0, 0.8);
		border-left: 4px solid rgba(0, 0, 0, 0.8);
		border-bottom: 4px solid rgba(0, 0, 0, 0.8);
		border-right: 4px solid rgba(0, 0, 0, 0);
		animation: spinner 0.6s linear infinite;
	}

	@keyframes spinner {
		to {
			transform: rotate(360deg);
		}
	}
</style>
