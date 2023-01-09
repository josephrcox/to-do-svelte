<script>
	import { fade } from 'svelte/transition';
	export let variable = '';
	export let value = false;

	function toggleVariable() {
		value = !value;
	}
</script>

<button on:click={toggleVariable} class="toggleButton">
	<span in:fade={{ duration:200 }}>
		{value ? `Hide ${variable}` : `Show ${variable}`}
	</span>
</button>
