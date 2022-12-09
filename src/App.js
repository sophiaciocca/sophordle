import React, { useState, useEffect } from 'react';
import { WORDS } from "./words";
import Gameboard from './Gameboard';
import Keyboard from './Keyboard';
import './App.scss';
let seedrandom = require('seedrandom');

export const GUESSES_ALLOWED = 6;
export const WORD_LENGTH = 5;

const generateRandomSeedFromDate = () => {
  /* creates string interpolation of today's date, to use with seedrandom &
  have a single random word across machines for the day */
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  return `${year}${month}${day}`;
}

function App() {

  const [ guessesRemaining, setGuessesRemaining ] = useState(GUESSES_ALLOWED);
  console.log('GUESSES REMAINING: ', guessesRemaining);
  const [ currentGuess, setCurrentGuess ] = useState([]);
  console.log('CURRENT GUESS: ', currentGuess);
  const randomSeed = generateRandomSeedFromDate();

  let nextLetter = 0;
  let correctAnswer = WORDS[Math.floor(seedrandom(randomSeed)() * WORDS.length)]
  console.log(correctAnswer);

  useEffect(() => {
    // create event listener for keyboard events
    const handleKeyUp = (e) => {
      console.log('IN HANDLE KEY UP! e: ', e)
      const { key } = e;
      if (!guessesRemaining) { // if guesses remaining = 0, just return
        return;
      } else if (key === 'Enter') { // if they press "enter", enter a guess
        submitGuess();
      } else if (key === 'Backspace') { // if they press "delete", delete a letter
        deleteLetter();
      } else if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) { // if they press a letter, insert letter
        insertLetter(key);
      }
    }
    window.document.addEventListener('keyup', handleKeyUp);
    console.log('event listener created.');
    return () => {
      window.document.removeEventListener('keyup', handleKeyUp);
      console.log('event listener removed.');
    }
  }, []);

  const insertLetter = (pressedKey) => {
    // if we're out of space, can't insert more letters
    if (nextLetter === 5) {
      return;
    }
    pressedKey = pressedKey.toLowerCase()
    console.log('inserting letter!: ', pressedKey);
  }

  const deleteLetter = () => {
    console.log('deleting letter!');
  }

  const submitGuess = () => {
    console.log('submitting guess!!');
  }

  return (
    <div className="App">
      <header className="App-header">
        Sophordle
      </header>
      <div className="App-body">
        <Gameboard />
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
