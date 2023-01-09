import { writable } from 'svelte/store';

if (!localStorage.getItem('database')) {
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

// export let currentItems = writable(JSON.parse(localStorage.getItem('database')).locations[0].items);
// export let currentLocation = writable(JSON.parse(localStorage.getItem('database')).locations[0].id);

export let currentItems = writable([]);
export let currentLocation = writable("");
export let confettiCounter = writable(0);