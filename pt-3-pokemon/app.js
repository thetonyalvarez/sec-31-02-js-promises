$(() => {
	const BASE_URL = "https://pokeapi.co/api/v2";
	let pokeCount = 3;

	// 1.  Figure out how to make a single request to the [Pokemon API](https://pokeapi.co/) to get names and URLs for every pokemon in the database.
	const getAllPokes = () => {
		return new Promise((resolve, reject) => {
			$.getJSON(`${BASE_URL}/pokemon?limit=1126`, (data) => {
				resolve(data);
				console.log(data);
				reject("ERROR");
			});
		});
	};

	// 2. Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.
	getAllPokes().then((res) => {
		let pokeNames = [];
		let pokeUrls = [];
		for (let i = 0; i < pokeCount; i++) {
			let randomPoke =
				res.results[Math.floor(Math.random() * (res.count - 1))];
			let { name, url } = randomPoke;
			pokeNames.push(name);
			pokeUrls.push(url);
		}

		for (let url of pokeUrls) {
			$.getJSON(`${url}`, (data) => {
				// Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable...
				let name = data.name;
				console.log(`${name}`, data);

				// ...and then make another request, this time to that pokemon’s species URL(you should see a key of species in the data).
				$.getJSON(`${data.species.url}`, (species) => {
					for (let entry of species.flavor_text_entries) {
						// Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.

						if (entry.language.name === "en") {
							console.log(`${data.name}: ${entry.flavor_text}`);
							break;
						} else {
							console.log(
								`No English entry found for flavor text for ${name}`
							);
							break;
						}
					}
				});
			});
		}
	});
});
