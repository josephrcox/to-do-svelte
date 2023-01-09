<script>
	import { currentItems, currentLocation } from './store.js';
    import { Confetti } from "svelte-confetti"
	import { default_item } from './ITEM_SCHEMA.js';

	let newItemName = '';
	let locationId = $currentLocation;
    let creatingNewItem = false;

	function createItem() {
		let newDB = JSON.parse(localStorage.getItem('database'));

        let locationIndex = newDB.locations.findIndex((loc) => loc.id === $currentLocation);

		let newItem = default_item;
		newItem.name = newItemName;
		newItem.id = Math.random().toString(36).substr(2, 9);

		newDB.locations[locationIndex].items = [
			newItem,
            ...newDB.locations[locationIndex].items,

        ];
        localStorage.setItem('database', JSON.stringify(newDB));
        currentItems.set(newDB.locations[locationIndex].items)
        newItemName = '';
	}

	// if the user presses enter, trigger the createItem function
	function handleKeypress(event) {
		if (event.key === 'Enter' && newItemName.length > 0) {
			createItem();
		}
	}
</script>

<div class="tooltip">Create an item</div>
<input
	type="text"
	id="newItemInput"
	placeholder="Pay rent..."
	bind:value={newItemName}
	on:keypress={handleKeypress}
/>

<style>
	/* your styles go here */
</style>
