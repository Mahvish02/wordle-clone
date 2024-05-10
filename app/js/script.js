console.log('keypress');

const lettersPattern = /[a-z]/;
let currentGuessCount = 1;
let currentGuess = document.querySelector('#guess' + currentGuessCount);

// detect keypress (letters, backspace, other)
/* Searched the net for detecting javascript code to detect a keypress */

document.addEventListener('keydown', (e) => {
	console.log('keypress:' + e.key);

	//If a letter
		/* Searched the net again to detect if the key pressed is a letter or not*/
		/* Result: Used a regular expression as a base for testing the input key press against it*/
		/* Note: This must let only string of length 1 be passed as true. Other keys like Shift or Tab must be passed as False.*/

		let keypress = e.key;
		if(
			keypress.length == 1 && 
			lettersPattern.test(e.key) &&
			currentGuess.dataset.letters.length < 5
		) {
		// console.log('is letter');
		updateLetters(keypress);
		}
		else if(e.key == 'Backspace' && currentGuess.dataset.letters != '') {
			console.log('is backspace');
			deleteFromLetters();
		} /* The && part is for the code to not throw an error when backspace is pressed on null string */


});

// Update "letters" 
const updateLetters = (letter) => {
	let oldletters = currentGuess.dataset.letters; /* To read the letters from input*/
	let newLetters = oldletters + letter; /* To update it one by one, instead of overriding old letter*/
	let currentTile = newLetters.length; /* The number of tile we are on, by typing one letter after the other*/
	currentGuess.dataset.letters = newLetters;
	console.log( 'currentTile = ' +currentTile);
	updateTiles(currentTile, letter);
}

// Update tile markup
const updateTiles = (tileNumber, letter) => {
	console.log ('updateTiles(' + tileNumber, letter + ')');
	let currentTile = document.querySelector('#guessTile' + tileNumber); /* The 'document.querySelector function matches the '#guessTile' with the guessTile in the index.html code. This way it can differentiate between the 5 div tag ids (for 5 tiles) and update the code accordingly */
	currentTile.innerText = letter; /* This is the line of code that displays the letters on screen*/
};

// Backspace -- Delete last letter
const deleteFromLetters = () => {
	// remove last letter from data-letters
	let oldLetters = currentGuess.dataset.letters;
	console.log('oldLetters = ' + oldLetters);
	let newLetters = oldLetters.slice(0, -1);
	console.log('newLetters =' + newLetters);
	currentGuess.dataset.letters = newLetters; /* This line allows the backspace function to work more than once (intead of just stopping at 1 backspace)*/
	deleteFromTiles(oldLetters.length);
};

// Backspace - Delete last tile markup
const deleteFromTiles = (tileNumber) => {
	// remove markup from last tile
	console.log('deleteFromTiles = ' + tileNumber);
	document.querySelector('#guessTile' + tileNumber).innerText = " ";
};

// Functions to accomplish:

	/* Detect keypresses

    - if keypress is a letter	[DONE]
        - update "letters" attribute	[DONE]
            - update tile markup based on "letters" value	[DONE]

    - if keypress is backspace	[DONE]
        - delete last letter in "letters"	[DONE]
            - update tile markup based on "letters"	[DONE] 
			
	*/

