<script>
	import { getData, getLocations } from './database.js';
	import { currentLocation, currentItems } from './store.js';
	let locations = getLocations();

	let timeoutId = null;
	const scrollLocationChangeDelay = 100;
	let x = 0;
	let location = $currentLocation;

	function scroll(event) {
		// Get the element that was scrolled
		let scrollContainer = event.target;

		// Calculate the index of the current section based on the scroll position
		let currentIndex = Math.floor(
			scrollContainer.scrollLeft / scrollContainer.offsetWidth
		);

		// Get the current section element
		let currentSection = scrollContainer.querySelector(
			`section:nth-child(${currentIndex + 1})`
		);

		// Read the 'data-name' attribute from the element
		let newLocationId = currentSection.getAttribute('data-id');

		// Clear any pending timeout
		clearTimeout(timeoutId);

		// Schedule the location change to be performed after the scrolling has stopped
		timeoutId = setTimeout(() => {
			changeLocation(newLocationId);
		}, scrollLocationChangeDelay);
	}

	function changeLocation(newLocationId) {
		console.log('changing location to ' + newLocationId);
		currentItems.set(getData(newLocationId).items);
		currentLocation.set(newLocationId);
	}

	function modifyLocation() {
		let newname = prompt('Enter new name for location');
		if (newname.length > 0) {
			let newDB = JSON.parse(localStorage.getItem('database'));
			console.log($currentLocation)
			let locationIndex = newDB.locations.findIndex(
				(loc) => loc.id === $currentLocation
			);
			console.log(locationIndex)
			newDB.locations[locationIndex].name = newname;
			localStorage.setItem('database', JSON.stringify(newDB));
			locations = getLocations();
		}
	}
</script>
<div class="tooltip">Pick your location <span class="subtip">(swipe)</span></div>
<div class="location-selector" on:scroll={scroll} on:dblclick={modifyLocation}>
	{#each locations as loc}
		<section data-name={loc.name} data-id={loc.id}>
			<button class="location-button">{loc.name}</button>
		</section>
	{/each}
</div>

<style>
	.location-selector {
		padding-top: 3px;
		padding-bottom: 3px;
		padding-inline: 5px;
		border-radius: 10px;
		font-family: sans-serif;
		scroll-snap-type: x mandatory;
		display: flex;
		-webkit-overflow-scrolling: touch;
		overflow-x: scroll;
		max-height: 30px;
		width: 100vw;
		overflow-y: hidden;
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
		margin-bottom: 10px;
	}
	section {
		scroll-snap-align: end;
	}
	button {
		all: unset;
		width: 100vw;
		background-color: #f1f1f1;
		color: black;
		text-align: center;
		padding: 10px;
	}
</style>
