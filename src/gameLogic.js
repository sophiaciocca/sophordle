import { WORDS } from "./words.js";

export const GUESSES_ALLOWED = 6;
export const WORD_LENGTH = 5;
let guessesRemaining = GUESSES_ALLOWED;
let currentGuess = [];
let nextLetter = 0;
let correctAnswer = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(correctAnswer);