const Deck = function(name, category, cards) {
	if (this instanceof Deck) {
		this.deck_name = name;
		this.category = category;
		this.cards = cards;
		this.index = 0;
	} else return new Deck(name, category);
}

Deck.prototype.addCard = function(...args) {
	// body...
	args.forEach(card => this.cards.push(card) );
}

Deck.prototype.shuffle = function() {
	//Fisher-Yates shuffle
	for ( let i = this.cards.length -1; i > 0; i--) {
		//get a random index
		let randomIndex = Math.floor(Math.random() * (i + 1));
		//store randomly chosen card to a temporary variable
		let card = this.cards[randomIndex];
		//change value of random index to current index
		this.cards[randomIndex] = this.cards[i];
		//change index to value of random index stored in variable
		this.cards[i] = card;
	}
}

Deck.prototype.nextCard = function() {
	this.index++;
	if (this.index == this.cards.length) {
		this.index = 0;
	} 
	return this.cards[this.index];
}

exports.Deck = Deck;