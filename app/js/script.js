console.log('keypress');

const lettersPattern = /[a-z]/;
let currentGuessCount = 1;
let currentGuess = document.querySelector('#guess' + currentGuessCount);
let words = ['baker','store','stamp','horse','speak','awake','adore','handy','front','clone','candy','alone','spend','write','train','yatch','wrist','lanes','queen','brisk','ranch','quiet','token','toned','tempt','atone','abode','grape','apple','juice','point','poker'];
let solutionWord = '';

//Choosing a solution word
const chooseWord = () => {
	// choose random item from words array
	let randomItem = Math.floor(Math.random() * (words.length -1));
	// console.log('words = ' + words);
	solutionWord = words[randomItem];
};
chooseWord();
// console.log('solution word =' + solutionWord)


// detect keypress (letters, backspace, enter, other)
document.addEventListener('keydown', (e) => {
	// console.log('keypress:' + e.key);

	//If a letter
		/* Searched the net again to detect if the key pressed is a letter or not*/
		/* Result: Used a regular expression as a base for testing the input key press against it*/
		/* Note: This must let only string of length 1 be passed as true. Other keys like Shift or Tab must be passed as False.*/

		//If letter
		let keypress = e.key;
		if (currentGuessCount < 7 ) {
			if(
				keypress.length == 1 && 
				lettersPattern.test(e.key) &&
				currentGuess.dataset.letters.length < 5
			) {
			updateLetters(keypress);
			}

			//If Backspace
			else if(e.key == 'Backspace' && currentGuess.dataset.letters != '') {
				// console.log('is backspace');
				deleteFromLetters();
			} /* The && part is for the code to not throw an error when backspace is pressed on null string */

			//If Enter
			else if(e.key == 'Enter' && currentGuess.dataset.letters.length == 5) {
				submitGuess();
			}
		}
});


// Submit a guessed word and check if its correct
const submitGuess = () => {
	console.log ('submit guess');
	for (let i =0; i<5; i++) {
		// console.log('currentGuessCount = ' + currentGuessCount + 'loop' + i);
		setTimeout(() => {
		revealTile(i, checkLetter(i));
		}, i * 200);
	}; /* For loop checks submitted guess word letter by letter. The timer is set for the tile flip animation which reveals each letter's state one letter at a time. */
};

const checkIfGuessComplete = (i) => {
	if(i == 4) {
		// console.log('Guess complete, check win');
		checkWin();
	} else {
		// console.log('Guess not complete');
	}
};

const jumpTiles = () => {
	for (let i = 0; i < 5; i++) {
		setTimeout(() => {
			let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + (i + 1));
			currentTile.classList.add('jump');
		}, i * 200);
	};
};

const checkWin = () => {
	// console.log('Check win');
	if (solutionWord == currentGuess.dataset.letters) {	//Win
		// console.log('game is won!');
		setTimeout(() => {
			jumpTiles();
	}, 500);
} else {	//Not a win
		currentGuessCount = currentGuessCount + 1;
		currentGuess = document.querySelector('#guess' + currentGuessCount);
		// console.log('Not a win, increment guess count to ' +currentGuessCount );
		if (currentGuessCount == 7) {
			setTimeout(() => {
				showSolution();
			}, 500);
		}
	}
};

const showSolution = () => {
	alert('Solution is ' +solutionWord);
};

// Update "letters" in the tiles
const updateLetters = (letter) => {
	let oldletters = currentGuess.dataset.letters; 		/* To read the letters from input*/
	let newLetters = oldletters + letter; 				/* To update it one by one, instead of overriding old letter*/
	let currentTile = newLetters.length; 				/* The number of tile we are on, by typing one letter after the other*/
	currentGuess.dataset.letters = newLetters;
	// console.log( 'currentTile = ' +currentTile);
	updateTiles(currentTile, letter);
}

// Update tile markup
const updateTiles = (tileNumber, letter) => {
	// console.log ('updateTiles(' + tileNumber, letter + ')');
	let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNumber); /* The 'document.querySelector function matches the '#guess''Tile' with the guess#Tile# in the index.html code. This way it can differentiate between the 5 div tag ids (for 5 tiles) and update the code accordingly */
	currentTile.innerText = letter; /* This is the line of code that displays the letters on screen*/
	currentTile.classList.add('has-letter');
};

// Backspace - Deletes last letter
const deleteFromLetters = () => {
	// remove last letter from data-letters
	let oldLetters = currentGuess.dataset.letters;
	// console.log('oldLetters = ' + oldLetters);
	let newLetters = oldLetters.slice(0, -1);
	// console.log('newLetters =' + newLetters);
	currentGuess.dataset.letters = newLetters; /* This line allows the backspace function to work more than once (intead of just stopping at 1 backspace)*/
	deleteFromTiles(oldLetters.length);

};

// Backspace - Delete last tile markup
const deleteFromTiles = (tileNumber) => {
	// remove markup from last tile
	// console.log('deleteFromTiles = ' + tileNumber);
	let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNumber);
	currentTile.innerText = " ";
	currentTile.classList.remove('has-letter');
};

// Check letter to solution
// parameter = letter position in the word
const checkLetter = (position) => {
	// console.log('checkLetter');
	let guessedLetter = currentGuess.dataset.letters.charAt(position);
	let solutionLetter = solutionWord.charAt(position);
	// console.log(guessedLetter, solutionLetter);

	// If letters match w/ solution letters , return "correct" 
	if (guessedLetter == solutionLetter) {
		return "correct";
	}

	// If letter exists in the solution word, return "present"
	else {
		return checkLetterExists(guessedLetter) ? "present" : "absent";
	}

	// If letter does not exist in the solution word, return "absent"
};

const checkLetterExists = (letter) => {
	return solutionWord.includes(letter);
};

// Revealing the tile's state
const revealTile = (i, state) => {
	// console.log('revealTile(' + i + ' ' + state  + ')');
	let tileNum = i+1;
	// let tile = document.querySelector('#guessTile' + tileNum);
	// console.log(tile);
	flipTile(tileNum, state);
	checkIfGuessComplete(i);
};

// Animation for revealing the tile's state
const flipTile = (tileNum, state) => {
	let tile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNum);
	tile.classList.add('flip-in');
	setTimeout(() => {
		tile.classList.add(state);
	}, 250);
	setTimeout(() => {
		tile.classList.remove('flip-in');
		tile.classList.add('flip-out');
	}, 250);
	setTimeout(() => {
		tile.classList.remove('flip-out');
	}, 1500);
};


