<script>
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { currentItems } from '../lib/store.js';
	import Item from './Item.svelte';
	import Toggle from './Toggle.svelte';

	let filter_showClosed = false;
	const duration = 300;

	let items;
	$: items = $currentItems;

	let visibleItems;
	$: visibleItems = items.filter(
		(item) => item.closed == false || filter_showClosed == true
	);
	// sort visibleItems so that closed items are at the bottom
	$: visibleItems.sort((a, b) => {
		if (a.closed == b.closed) return 0;
		if (a.closed == true) return 1;
		if (b.closed == true) return -1;
	});
</script>

<!-- markup (zero or more items) goes here -->

<Toggle variable="Closed" bind:value={filter_showClosed} />
<div class="itemList">
	{#each visibleItems as item (item)}
		<div in:fade={{ duration }}>
			<Item data={item} />
		</div>
	{/each}
</div>

<style>
	/* your styles go here */
</style>
