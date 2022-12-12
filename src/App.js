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
  const [wonGame, setWonGame] = useState(false);
  const [lostGame, setLostGame] = useState(false);

  const solution = WORDS[Math.floor(seedrandom(randomSeed)() * WORDS.length)]

  const handleKeyUp = (e) => {
    const { key } = e;
    if (wonGame || lostGame) { // if game is over, just return
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
    return () => {
      window.document.removeEventListener('keyup', handleKeyUp);
    }
  }, [currentGuess]);

  const insertLetter = (letter) => {
    if (currentGuess.length === 5) { // if we're out of space, can't insert more letters
      return;
    }
    setCurrentGuess((oldCurrentGuess) => [...oldCurrentGuess, letter]);
  }

  const deleteLetter = () => {
    if (!currentGuess.length) {
      return;
    }
    setCurrentGuess((oldCurrentGuess) => oldCurrentGuess.slice(0, -1));
  }

  function submitGuess() {
    if (currentGuess.length !== 5) {
      return;
    }
    // move current guess to past guesses!
    setPastGuesses((prevPastGuesses) => {
      const newArr = [...prevPastGuesses, [...currentGuess]]
      return newArr;
    });
    // reset currentGuess to empty array
    setCurrentGuess([]);
    // (if it was guess 6, set gameOver to true)
    if (guessNumber === 6) {
      // TODO: if word is wrong, set lost. if word is right, set won
      setLostGame(true);
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
        <Gameboard currentGuess={currentGuess} pastGuesses={pastGuesses} solution={solution} />
        <Keyboard insertLetter={insertLetter} deleteLetter={deleteLetter} submitGuess={submitGuess} />
      </div>
    </div>
  );
}

export default App;
