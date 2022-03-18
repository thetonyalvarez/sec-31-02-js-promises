$(() => {
	const BASE_URL = "https://pokeapi.co/api/v2";
	let pokeCount = 3;
	let pokeNames = [];

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
	getAllPokes()
		.then((res) => {
			let pokeNames = [];
			let pokeUrls = [];
			for (let i = 0; i < pokeCount; i++) {
				let randomPoke =
					res.results[Math.floor(Math.random() * (res.count - 1))];
				let { name, url } = randomPoke;
				pokeNames.push(name);
				pokeUrls.push(url);
			}
			return Promise.all(pokeUrls.map((url) => $.getJSON(url)));
		})
		.then((pokemon) => {
			pokemon.forEach((poke) => {
				console.log(`Pokemon: ${poke.name}`, poke);
			});
		});

	// 3. Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable...
	getAllPokes()
		.then((res) => {
			let pokeNames = [];
			let pokeUrls = [];
			for (let i = 0; i < pokeCount; i++) {
				let randomPoke =
					res.results[Math.floor(Math.random() * (res.count - 1))];
				let { name, url } = randomPoke;
				pokeNames.push(name);
				pokeUrls.push(url);
			}
			return Promise.all(pokeUrls.map((url) => $.getJSON(url)));
		})
		// ... and then make another request, this time to that pokemon’s species URL (you should see a key of species in the data).
		.then((pokeUrls) => {
			pokeNames = pokeUrls.map((poke) => poke.name);
			return Promise.all(
				pokeUrls.map((poke) => $.getJSON(poke.species.url))
			);
		})
		// Once _that_ request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English.If you find one, console.log the name of the pokemon along with the description you found.
		.then((speciesUrls) => {
			let descriptions = speciesUrls.map((data) => {
				let description = data.flavor_text_entries.find(
					(entry) => entry.language.name == "en"
				);
				return description
					? description.flavor_text
					: `No English entry found for flavor text for ${data.name}`;
			});
			descriptions.forEach((text, idx) => {
				console.log(`${pokeNames[idx]}: ${text}`);
			});
		});

	// 4. BONUS Instead of relying on console.log, let’s create a UI for these random pokemon. Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.

	let $btn = $("button");
	let $pokeArea = $("#pokemon-wrapper");

	$btn.on("click", () => {
		$pokeArea.empty();
		getAllPokes()
			.then((res) => {
				let pokeNames = [];
				let pokeUrls = [];
				for (let i = 0; i < pokeCount; i++) {
					let randomPoke =
						res.results[
							Math.floor(Math.random() * (res.count - 1))
						];
					let { name, url } = randomPoke;
					pokeNames.push(name);
					pokeUrls.push(url);
				}
				return Promise.all(pokeUrls.map((url) => $.getJSON(url)));
			})
			.then((pokeUrls) => {
				pokeNames = pokeUrls.map((poke) => ({
					name: poke.name,
					image: poke.sprites.front_default,
				}));
				return Promise.all(
					pokeUrls.map((poke) => $.getJSON(poke.species.url))
				);
			})
			.then((speciesUrls) => {
				let descriptions = speciesUrls.map((data) => {
					let description = data.flavor_text_entries.find(
						(entry) => entry.language.name == "en"
					);
					return description
						? description.flavor_text
						: `No English entry found for flavor text for ${data.name}`;
				});
				descriptions.forEach((text, idx) => {
					let name = pokeNames[idx].name;
					let image = pokeNames[idx].image;
					$pokeArea.append(createPokeCard(name, image, text));
				});
			});
	});

	const createPokeCard = (name, image, description) => {
		return `
			<div class="card pokemon-card">
				<h1>${name}</h1>
				<img src="${image}">
				<p>${description}</p>
			</div>
		`;
	};
});
