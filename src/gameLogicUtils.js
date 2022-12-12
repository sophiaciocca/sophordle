import { LETTER_STATUS_OPTIONS } from "./Gameboard";

export const getGuessStatus = (solution, guess) => {

  const guessStatus = [];
  const solutionArr = solution.split('');

  guess.forEach((letter, index) => {
    if (letter === solution[index]) {
      guessStatus.push(LETTER_STATUS_OPTIONS.inPlace);
    } else if (solutionArr.includes(letter)) {
      guessStatus.push(LETTER_STATUS_OPTIONS.outOfPlace);
    } else {
      guessStatus.push(LETTER_STATUS_OPTIONS.incorrect);
    }
  });

  return guessStatus;
}

export const getKeyStatus = (solution, pastGuesses) => {
  return LETTER_STATUS_OPTIONS.inPlace;
}