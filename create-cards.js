// create constructors for Basic Card and Clozure Card

const BasicCard = function(front, back) {
	if (this instanceof BasicCard) {
		this.type = "basic";
		this.front = front;
		this.back = back;
	} else return new BasicCard(front, back);
}

BasicCard.prototype.showFront = function() {
	return this.front;
}

BasicCard.prototype.showBack = function() {
	return this.back;
}

const ClozeCard = function(text, cloze) {
	if (this instanceof ClozeCard) {
		if (text.includes(cloze)) {
			this.type = 'cloze';
			this.fullText = text;
			this.partial = cloze;
		} else throw new Error("The text and cloze do not match.");
	} else return new ClozeCard(text, cloze);
}

ClozeCard.prototype.showCloze = function() {
	return this.partial;
}

ClozeCard.prototype.showPartial = function() {
	return this.fullText.replace(RegExp(this.partial, "gi"), ". . .");
}

ClozeCard.prototype.showFullText = function() {
	return this.fullText;
}

exports.BasicCard = BasicCard;
exports.ClozeCard = ClozeCard;
