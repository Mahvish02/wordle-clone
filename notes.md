# Functional Requirements

## Gameplay

6 tries to guess a 5-letter word

## Making a guess

Detect keypresses
    - if keypress is a letter
        - update "letters" attribute
            - update tile markup based on "letters" value
    - if keypress is backspace
        - delete last letter in "letters"
            - update tile markup based on "letters"

Dont run update function if "letters" length = 4

Typing in the letter will display the letter in the title
Backspace will delete letters
Enter will submit guess

Guesses must be are real word, in "word list"

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