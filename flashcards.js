const fs = require('fs');
const inquirer = require('inquirer');

const cards = require('./create-cards.js');

const decks = require('./create-decks.js');

const ClozeCard = cards.ClozeCard;
const BasicCard = cards.BasicCard;
const Deck = decks.Deck;


function chooseDeck() {
	//use inquirer to allow users to select from a list of decks stored in a file
	const decks = getDecksFromFile(); //function that returns an array of Deck objects

	inquirer.prompt([{}]).then((response)=> {

		const activeDeck = decks[response.index];

	});
	
}

function getDecksFromFile() {

	let arr = fs.readFileSync('decks.json', 'utf-8');
	return JSON.parse(arr);
}

function writeDeckToFile(deck) {

	if (!fs.existsSync('decks.json')) {

		fs.writeFileSync('decks.json', "[" + JSON.stringify(deck) + "]");

	} else {

		fs.readFile('decks.json', 'utf-8', (err, data) => {
			if (err) throw err;

			let arr;

			if (data) {
				arr = JSON.parse(data);
			} else { 
				arr = [];
			}

			arr.push(deck);

			fs.writeFile('decks.json', JSON.stringify(arr), (err) => {
  				if (err) throw err;
  			});
			
		});
	}

}


// // testing
// var clozeOne = new ClozeCard("Abraham Lincoln was the 16th President of the United States.", "Abraham Lincoln");
// console.log("Partial Card: " + clozeOne.showPartial());
// console.log("Full Text: " + clozeOne.showFullText());
// console.log("Cloze: " + clozeOne.showCloze());
// var woodchuck = new ClozeCard("How much wood could a woodchuck chuck if a woodchuck could chuck wood?", "woodchuck");
// console.log("Partial Card: " + woodchuck.showPartial());

// var basicOne = new BasicCard("PI", "3.14159265");
// console.log(basicOne.showFront());
// console.log(basicOne.showBack());

// // var clozeTwo = new ClozeCard("foo", "bar");

// var deckOne = new Deck("Test", "general");
// deckOne.addCard(clozeOne, basicOne);
// deckOne.shuffle();
// for (let i = 0; i < deckOne.cards.length; i++) {
// 	console.log(deckOne.nextCard());
// }

// writeDeckToFile(deckOne);
// console.log(getDecksFromFile());