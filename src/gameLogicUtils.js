import { LETTER_STATUS_OPTIONS } from "./Gameboard";

export const getGuessStatus = (solution, guess) => {
  const guessStatus = [];

  guess.forEach((letter, index) => {
    guessStatus.push(getLetterStatus(letter, index, solution));
  });

  return guessStatus;
}

export const getLetterStatus = (letter, index, solution) => {
  const solutionArr = solution.split('');

  if (letter === solution[index]) {
    return LETTER_STATUS_OPTIONS.inPlace;
  } else if (solutionArr.includes(letter)) {
    return LETTER_STATUS_OPTIONS.outOfPlace;
  } else {
    return LETTER_STATUS_OPTIONS.incorrect;
  }
}

export const generateLetterStatusMap = () => {
  const letterStatuses = [
    ['a', LETTER_STATUS_OPTIONS.unguessed],
    ['b', LETTER_STATUS_OPTIONS.unguessed],
    ['c', LETTER_STATUS_OPTIONS.unguessed],
    ['d', LETTER_STATUS_OPTIONS.unguessed],
    ['e', LETTER_STATUS_OPTIONS.unguessed],
    ['f', LETTER_STATUS_OPTIONS.unguessed],
    ['g', LETTER_STATUS_OPTIONS.unguessed],
    ['h', LETTER_STATUS_OPTIONS.unguessed],
    ['i', LETTER_STATUS_OPTIONS.unguessed],
    ['j', LETTER_STATUS_OPTIONS.unguessed],
    ['k', LETTER_STATUS_OPTIONS.unguessed],
    ['l', LETTER_STATUS_OPTIONS.unguessed],
    ['m', LETTER_STATUS_OPTIONS.unguessed],
    ['n', LETTER_STATUS_OPTIONS.unguessed],
    ['o', LETTER_STATUS_OPTIONS.unguessed],
    ['p', LETTER_STATUS_OPTIONS.unguessed],
    ['q', LETTER_STATUS_OPTIONS.unguessed],
    ['r', LETTER_STATUS_OPTIONS.unguessed],
    ['s', LETTER_STATUS_OPTIONS.unguessed],
    ['t', LETTER_STATUS_OPTIONS.unguessed],
    ['u', LETTER_STATUS_OPTIONS.unguessed],
    ['v', LETTER_STATUS_OPTIONS.unguessed],
    ['w', LETTER_STATUS_OPTIONS.unguessed],
    ['x', LETTER_STATUS_OPTIONS.unguessed],
    ['y', LETTER_STATUS_OPTIONS.unguessed],
    ['z', LETTER_STATUS_OPTIONS.unguessed],
  ];
  return new Map(letterStatuses);
}