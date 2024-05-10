console.log('keypress');

const lettersPattern = /^[A-Za-z][A-Za-z0-9]*$/;

// detect keypress (letters, backspace, other)
/* Searched the net for detecting javascript code to detect a keypress */

document.addEventListener('keydown', (e) => {
	console.log('keypress:' + e.key);

	//If a letter
		/* Searched the net again to detect if the key pressed is a letter or not*/
		/* Result: Used a regular expression as a base for testing the input key press against it*/
		/* Note: This must let only string of length 1 be passed as true. Other keys like Shift or Tab must be passed as False.*/

		let keypress = e.key;
		if(keypress.length == 1) {
		let isLetter = lettersPattern.test(e.key);
		console.log(isLetter);
		}

	//If backspace


});

// Update "letters" 

// Update tile markup

// Delete last letter

