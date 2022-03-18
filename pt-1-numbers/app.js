const BASE_URL = "http://numbersapi.com";

let favNumber = 1;

/*
    1.  Make a request to the Numbers API to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.)
*/

$.get(`${BASE_URL}/${favNumber}?json`).then((response) => {
	$("#fav-number").text(`Favorite Number: ${response.number}`);
	$("#fav-number-fact").text(`Fact: ${response.text}`);
});

/*
    2.  Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
*/

let numbers = [1, 2, 3, 4];

$.get(`${BASE_URL}/${numbers}`).then((res) => {
	let data = JSON.parse(res);
	for (let [num, fact] of Object.entries(data)) {
		$("#mult-number-facts").append(`${num}: ${fact}<br>`);
	}
});

/*
    3.  Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
*/

const types = ["trivia", "math", "date", "year"];

for (type of types) {
	$.get(`${BASE_URL}/${favNumber}/${type}/`, (data) => {
		$("#fav-number-facts").append(`<div>${data}</div>`);
	});
}
