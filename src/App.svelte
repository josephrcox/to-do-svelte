<script>
	import HierarchyController from './lib/HierarchyController.svelte';
	import ItemList from './lib/ItemList.svelte';
	import CreateItem from './lib/CreateItem.svelte';
	import { confettiCounter } from './lib/store.js';
	import { Confetti } from 'svelte-confetti';
</script>

<!-- markup (zero or more items) goes here -->

<HierarchyController />
<div class="container">
	<CreateItem />
	{#each Array($confettiCounter) as _}
		<Confetti
			size={Math.random() * 30 + 10}
			amount={Math.random() * 150 + 50}
			duration={Math.random() * 1000 + 1000}
			colorRange={[0,Math.random() * 360 + 120]}
		/>
	{/each}
	<ItemList />


</div>

<style>
	/* your styles go here */
</style>
