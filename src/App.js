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
  const [ currentGuess, setCurrentGuess ] = useState([]);
  const randomSeed = generateRandomSeedFromDate();

  let nextLetter = 0;
  let correctAnswer = WORDS[Math.floor(seedrandom(randomSeed)() * WORDS.length)]
  console.log(correctAnswer);

  useEffect(() => {
    // create event listener for keyboard events
    const handleKeyUp = (e) => {
      console.log('IN HANDLE KEY UP!')
      // if guesses remaining = 0, just return
      // if they press "enter", enter a guess
      // if they press "delete", delete a letter
      // if they press a letter, insert letter
    }
    window.document.addEventListener('keyup', handleKeyUp);
    console.log('event listener created.');
    return () => {
      window.document.removeEventListener('keyup', handleKeyUp);
      console.log('event listener removed.');
    }
  }, []);

  const insertLetter = (pressedKey) => {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
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
