# flashcards
This is a node based app that allows users to create sets of flashcards and to be able to work through them towards learning new subject matter.

### Download Instructions

1. Fork this repository
2. `npm install`


As of 02/21/2017, the code is functional for creating cards, creating decks and with prototype functions on each type of card (Basic, with a front and back, or Cloze, with some factoid hidden) as well as prototype functions on each deck, such as shuffling or cycling through cards. But there is not a user interface either on the command line or in the browser. This interface is still in progress.

#### To do:

1. Use inquirer package to ask user to do the following:

   *Create Deck or View Deck

   		*If create, then
   			*Ask user to give a name and category for the deck
   			*Prompt user to create a card
   			*After Card creation, ask user to either create another card, save deck, or start over

   		*If view deck, then
   			*Prompt user to choose deck from saved decks
   			*Cycle through each card in the deck and quiz user on the answer
   			*After cycling through each card, ask user to start over or start over
