const fs = require('fs');
const inquirer = require('inquirer');

const cards = require('./create-cards.js');

const decks = require('./create-decks.js');

const ClozeCard = cards.ClozeCard;
const BasicCard = cards.BasicCard;
const Deck = decks.Deck;


function chooseDeck() {
	//use inquirer to allow users to select from a list of decks stored in a file

	var savedDecks = convertedData();

	var deckNames = [];

	savedDecks.forEach((deck, index)=>{
		deckNames.push(`${index}) ${deck.deck_name}`);
	});

	if (savedDecks.length==0) {
		console.log(`\nThere are no current decks to choose from. You need to create a deck first.\n`);
		//call function to create a deck
	}

	inquirer.prompt([
		{
			type: "list",
			name: "deck",
			message: "Choose which deck you would like to study?",
			choices: deckNames
		}
	]).then((response)=> {

		var index = response.deck.toString().slice(0,1);

		var activeDeck = savedDecks[index];

		console.log(activeDeck);

		activeDeck.shuffle();

		cycleCards(activeDeck);

	});
	
}

function convertedData() {
	var savedDecks = getDecksFromFile(); 

	savedDecks.forEach((deck, index)=> {
		// convert data to instance of Deck
		savedDecks[index] = new Deck(deck.deck_name, deck.category, deck.cards);
		//convert cards in Deck to instance of card by type
		savedDecks[index].cards.forEach((card, i)=>{
			if (card.type == "basic") {
				savedDecks[index].cards[i] = new BasicCard(card.front, card.back);
			} else {
				savedDecks[index].cards[i] = new ClozeCard(card.fullText, card.partial);
			}
		});
	});

	return savedDecks;

}

function getDecksFromFile() {

	if (!fs.existsSync('decks.json')) {
		return [];
	} else {
		let arr = fs.readFileSync('decks.json', 'utf-8');
		if (!arr) {
			return [];
		} else {
			return JSON.parse(arr);
		}
	} 
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

function cycleCards(deck) {

	// TODO create function to cycle through deck
		//use inquirer to get user input to solve either close or back
		//go to next card
		//ask user to start over or exit after completing cycle

}


// // **********testing**********


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

// var deckOne = new Deck("Test", "general", []);
// deckOne.addCard(clozeOne, basicOne, woodchuck);


// writeDeckToFile(deckOne);
// // console.log(getDecksFromFile());

// chooseDeck();