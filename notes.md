# Functional Requirements

## Gameplay

6 tries to guess a 5-letter word

## Pick a solution word

[DONE] Store solution words in a JSON object / array
[DONE] when game is loaded, choose a random item from the array
[DONE] Set solution to that word

## Making a guess

[DONE] Detect keypresses
[DONE] - if keypress is a letter
[DONE]  - update "letters" attribute
[DONE]   - update tile markup based on "letters" value
[DONE] - if keypress is backspace
[DONE]  - delete last letter in "letters"
[DONE]   - update tile markup based on "letters"

[DONE] Dont run update function if "letters" length = 4

## Submit guess

[DONE] Pressing Enter will submit guess
[DONE]   - compare each letter with the corresponding letter in the solution word
[DONE]    - update the state/color of the letter
    - If all letters are "correct" / green, game is won

[DONE] Typing in the letter will display the letter in the title
[DONE] Backspace will delete letters
Enter will submit guess

Guesses must be a real word, in "word list"

Guess colors (data-state): 
    - gray: "absent", letter not in word
    - yellow: "present", letter in word, but in wrong position
    - green: "correct", letter in word, and in right position

Hard Mode: present or correct letters must be used in subsequent guesses

Guesses are saved in Local Storage

## Design

Tiles 5x6
Virtual Keyboard

## Interactions

When typing a letter:
    - border of the title changes to light gray
    - blinking in animation with letter
    - backspace will remove letter, border changes back to dark gray

When submitting guess:
    - Tiles will flip up and background color will change on guess
    - Slight delay between each tile flipping
    - Background color changes when tile is flat, i.e. can't see it