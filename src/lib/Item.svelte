<script>
	import { currentItems, currentLocation, confettiCounter } from './store.js';
	export let data = {};

	let showDetails = false;

	function close() {
		confettiCounter.set($confettiCounter + 1);
		let newDB = JSON.parse(localStorage.getItem('database'));

		let locationIndex = newDB.locations.findIndex(
			(loc) => loc.id === $currentLocation
		);
		let itemIndex = newDB.locations[locationIndex].items.findIndex(
			(item) => item.id === data.id
		);
		newDB.locations[locationIndex].items[itemIndex].closed = true;
		localStorage.setItem('database', JSON.stringify(newDB));
		currentItems.set(newDB.locations[locationIndex].items);
	}
	function restore() {
		let newDB = JSON.parse(localStorage.getItem('database'));

		let location = newDB.locations.find((loc) => loc.id === $currentLocation);
		let item = location.items.find((item) => item.id === data.id);
		item.closed = false;

		localStorage.setItem('database', JSON.stringify(newDB));
		currentItems.set(location.items);
	}

	function toggleDetails() {
		showDetails = !showDetails;
	}

	function createTable(jsonData) {
		let html = '<table>';

		// Loop through the properties of the JSON data object
		for (const property in jsonData) {
			html += '<tr>';

			// Create cells for the property name and value
			html += `<td>${property}</td>`;
			html += `<td>${jsonData[property]}</td>`;

			html += '</tr>';
		}

		html += '</table>';

		return html;
	}
</script>

<!-- markup (zero or more items) goes here -->

<div class="item-container" on:click={toggleDetails}>
	<div class="item" data-closed={data.closed}>
		<div>
			{data.name}
		</div>
		<div>
			{#if data.closed}
				<button on:click={restore}> Restore</button>
			{:else}
				<button on:click={close}> Close</button>
			{/if}
		</div>
	</div>
	{#if showDetails}
		<div class="item-details">
			{@html createTable(data)}
		</div>
	{/if}
</div>

<style>
	/* your styles go here */
</style>
