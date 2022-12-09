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

  const [guessNumber, setGuessNumber] = useState(0);
  console.log('GUESS NUMBER: ', guessNumber);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [pastGuesses, setPastGuesses] = useState([]);
  console.log('CURRENT GUESS: ', currentGuess);
  console.log('PAST GUESSES: ', pastGuesses);
  const randomSeed = generateRandomSeedFromDate();
  const guessesRemaining = GUESSES_ALLOWED - guessNumber;
  console.log('GUESSES REMAINING: ', guessesRemaining);
  const [gameOver, setGameOver] = useState(false);

  let correctAnswer = WORDS[Math.floor(seedrandom(randomSeed)() * WORDS.length)]
  console.log(correctAnswer);

  const handleKeyUp = (e) => {
    const { key } = e;
    if (gameOver) { // if game is over, just return
      return;
    } else if (key === 'Enter') { // if they press "enter", enter a guess
      submitGuess();
    } else if (key === 'Backspace') { // if they press "delete", delete a letter
      deleteLetter();
    } else if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) { // if they press a letter, insert letter
      insertLetter(key);
    }
  }

  useEffect(() => {
    // create event listener for keyboard events
    window.document.addEventListener('keyup', handleKeyUp);
    console.log('event listener created.');
    return () => {
      window.document.removeEventListener('keyup', handleKeyUp);
      console.log('event listener removed.');
    }
  }, [currentGuess]);

  const insertLetter = (letter) => {
    // if we're out of space, can't insert more letters
    console.log('IN INSERT LETTER. current guess length? ', currentGuess);
    if (currentGuess.length === 5) {
      console.log('out of space, cant insert letter');
      return;
    }
    console.log('inserting letter!: ', letter);
    setCurrentGuess((oldCurrentGuess) => [...oldCurrentGuess, letter]);
  }

  const deleteLetter = () => {
    if (!currentGuess.length) {
      console.log('nothing to delete; do nothing');
      return;
    }
    console.log('deleting letter!');
    setCurrentGuess((oldCurrentGuess) => oldCurrentGuess.slice(0, -1));
  }

  function submitGuess() {
    console.log('submitting guess!!');
    console.log('****currentGuess:: ', currentGuess);
    // move current guess to past guesses!
    setPastGuesses((prevPastGuesses) => {
      console.log('prev past guesses: ', prevPastGuesses);
      const newArr = [...prevPastGuesses, [...currentGuess]]
      return newArr;
    });
    // reset currentGuess to empty array
    setCurrentGuess([]);
    // (if it was guess 6, set gameOver to true)
    if (guessNumber === 6) {
      setGameOver(true);
    } else { // otherwise, increase guess number
      setGuessNumber((prevGuessNumber) => prevGuessNumber++);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        Sophordle
      </header>
      <div className="App-body">
        <Gameboard currentGuess={currentGuess} pastGuesses={pastGuesses} />
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
