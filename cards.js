$(function () {
	const BASE_URL = "http://deckofcardsapi.com";
	let deck_count = 6;

	const $cardWrapper = $("#card-wrapper");
	const $cardPile = $("#card-pile");
	const $btn = $("button");

	const draw_card = (deckId = "new") => {
		return new Promise((resolve, reject) => {
			$.get(
				`${BASE_URL_CARD}/api/deck/${deckId}/draw/?count=1`,
				(deck) => {
					resolve(deck);
					reject("Error");
				}
			);
		});
	};

	draw_card().then((res) => {
		// console.log(res);
		let { cards, deck_id } = res;
		let { suit, value } = cards[0];
		console.log(`Deck Exer. 1 Card: ${value} of ${suit}`);
		console.log(`Deck Exer. 1 Deck ID: ${deck_id}`);
		// console.log(deck_id);
	});

	// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

	// Once you have both cards, console.log the values and suits of both cards.
	// Draws a new deck by default if no id is defined

	const callDeck = (deckId = "new") => {
		return new Promise((resolve, reject) => {
			$.get(`${BASE_URL_CARD}/api/deck/${deckId}`, (deck) => {
				resolve(deck);
				reject("Error");
			});
		});
	};

	// callDeck().then((res) => {
	// 	let { deck_id } = res;
	// 	return deck_id;
	// });

	// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

	callDeck()
		.then((res) => {
			let { deck_id } = res;
			console.log(`Deck Exer. 2 ID: ${deck_id}`);
			return deck_id;
		})
		.then((deck_id) => {
			draw_card(deck_id).then((res) => {
				let { cards } = res;
				let { suit, value } = cards[0];
				console.log(`Deck Exer. 2 Card 1: ${value} of ${suit}`);
				console.log(`Deck Exer. 2 Card 1 Deck ID: ${deck_id}`);
			});
			draw_card(deck_id).then((res) => {
				let { cards } = res;
				let { suit, value } = cards[0];
				console.log(`Deck Exer. 2 Card 2: ${value} of ${suit}`);
				console.log(`Deck Exer. 2 Card 2 Deck ID: ${deck_id}`);
			});
		});

	// let deck = callDeck().then((res) => {
	// 	console.log(res.deck_id);
	let deck = new Promise((resolve, reject) => {
		callDeck().then((res) => {
			// let { remaining, deck_id, shuffled } = res;
			// let id = res.deck_id;
			resolve(res);
		});
	});

	// callDeck(deck.deck_id).then((res) => {
	// callDeck("z78zy1gqhasn").then((res) => {
	// 	console.log("deck id", res);
	// 	draw_card(res.deck_id);
	// });

	const draw_card_same_deck = () => {};

	let deckId = null;

	$btn.on("click", () => {
		const deckIdA = new Promise((resolve, reject) => {
			$.get(`${BASE_URL_CARD}/api/deck/new/shuffle`, (deck) => {
				resolve(deck);
				reject("Error");
			});
		});
		console.log("new deck", deckIdA);
		$.get(`${BASE_URL_CARD}/api/deck/${deckId}/draw/?count=1`, (deck) => {
			resolve(deck);
			reject("Error");
		});
	});
});
