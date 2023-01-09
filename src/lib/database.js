export function getData(locationId) {
	console.log('Getting data from: ', locationId);
	const database = localStorage.getItem('database');
	if (database) {
		if (locationId) {
			const location = JSON.parse(database).locations.find(
				(item) => item.id === locationId
			);
			return location;
		}
	} else {
		localStorage.setItem(
			'database',
			JSON.stringify({
				locations: [
					{
						id: Math.random().toString(36).substring(2, 9),
						name: 'Home',
						items: [],
					},
					{
						id: Math.random().toString(36).substring(2, 9),
						name: '2nd home',
						items: [],
					},
				],
			})
		);
		return getData();
	}
}

export function createItem(location, name) {
    console.log(location, name)
	const database = JSON.parse(localStorage.getItem('database'));
    console.log(database)
	const locationIndex = database.locations.findIndex(
		(item) => item.id === location
	);
    console.log(locationIndex)
	database.locations[locationIndex].items.push({
		id: Math.random().toString(36).substring(2, 11),
		name,
		closed: false,
		dateCreated: new Date().toISOString(),
		dateClosed: null,
	});
	localStorage.setItem('database', JSON.stringify(database));
    getData(location)
}

export function closeItem(location, itemID) {
    const database = JSON.parse(localStorage.getItem('database'));
    const locationIndex = database.locations.findIndex(
        (item) => item.id === location
    );
    const itemIndex = database.locations[locationIndex].items.findIndex(
        (item) => item.id === itemID
    );
    database.locations[locationIndex].items[itemIndex].closed = true;
    database.locations[locationIndex].items[itemIndex].dateClosed = new Date().toISOString();
    localStorage.setItem('database', JSON.stringify(database));
    getData(location)
}

export function createLocation() {}

export function getLocations() {
	const database = JSON.parse(localStorage.getItem('database'));
	if (database == null) {
		createDefaultDB();
		return JSON.parse(localStorage.getItem('database')).locations;
	}
	return database.locations;
}

function createDefaultDB() {
	localStorage.setItem(
		'database',
		JSON.stringify({
			locations: [
				{
					id: Math.random().toString(36).substring(2, 9),
					name: 'Home',
					items: [],
				},
				{
					id: Math.random().toString(36).substring(2, 9),
					name: '2nd home',
					items: [],
				},
			],
		})
	);
}