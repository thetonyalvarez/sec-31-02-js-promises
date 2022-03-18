$(function () {
	const BASE_URL = "http://deckofcardsapi.com";

	const $cardWrapper = $("#card-wrapper");
	const $cardPile = $("#card-pile");
	const $btn = $("button");

	const draw_card = (deckId = "new") => {
		return new Promise((resolve, reject) => {
			$.getJSON(
				`${BASE_URL}/api/deck/${deckId}/draw/?count=1`,
				(deck) => {
					resolve(deck);
					reject("Error");
				}
			);
		});
	};

	const callDeck = (deckId = "new") => {
		return new Promise((resolve, reject) => {
			$.getJSON(`${BASE_URL}/api/deck/${deckId}/shuffle`, (deck) => {
				resolve(deck);
				reject("Error");
			});
		});
	};

	// * 1.
	// Make a request to the deck of cards API to request a single card from a newly shuffled deck.Once you have the card, make a request to the same API to get one more card from the same deck.

	// Once you have both cards, console.log the values and suits of both cards.
	// Draws a new deck by default if no id is defined

	draw_card().then((res) => {
		let { cards, deck_id } = res;
		let { suit, value } = cards[0];
		console.log(`#1. Card: ${value} of ${suit}`);
		console.log(`#1. Deck ID: ${deck_id}`);
	});

	// * 2.
	// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.Once you have the card, console.log the value and the suit(e.g. “5 of spades”, “queen of diamonds”).

	callDeck()
		.then((res) => {
			let { deck_id } = res;
			console.log(`#2 Deck ID: ${deck_id}`);
			return deck_id;
		})
		.then((deck_id) => {
			draw_card(deck_id).then((res) => {
				let { cards } = res;
				let { suit, value } = cards[0];
				console.log(`#2 Card A: ${value} of ${suit}`);
				console.log(
					`#2 Card A Deck ID ((should match #2 Deck ID)): ${deck_id}`
				);
			});
			draw_card(deck_id).then((res) => {
				let { cards } = res;
				let { suit, value } = cards[0];
				console.log(`#2 Card B: ${value} of ${suit}`);
				console.log(
					`#2 Card B Deck ID ((should match #2 Deck ID)): ${deck_id}`
				);
			});
		});

	let deck = new Promise((resolve, reject) => {
		callDeck()
			.then((res) => {
				resolve(res);
			})
			.catch((reject) => reject(err));
	});

	// * 3.
	// Build an HTML page that lets you draw cards from a deck.When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.Every time you click the button, display a new card, until there are no cards left in the deck.

	let deckId = null;

	$.getJSON(`${BASE_URL}/api/deck/new/shuffle`).then((deck) => {
		deckId = deck.deck_id;
	});

	$btn.on("click", () => {
		$.getJSON(`${BASE_URL}/api/deck/${deckId}/draw/?count=1`, (deck) => {
			let imgUrl = deck.cards[0].image;
			$cardPile.append(`<img src=${imgUrl}>`);
		});
		if (deck.remaining == 0) {
			$btn.remove;
		}
	});
});
