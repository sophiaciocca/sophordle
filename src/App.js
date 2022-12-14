import React, { useState, useEffect, useCallback } from 'react';
import { WORDS } from "./words";
import Gameboard from './Gameboard';
import Keyboard from './Keyboard';
import { generateLetterStatusMap, getLetterStatus } from './gameLogicUtils';
import Message from './Message';
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
  const [guessNumber, setGuessNumber] = useState(1);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [pastGuesses, setPastGuesses] = useState([]);
  const randomSeed = generateRandomSeedFromDate();
  const [wonGame, setWonGame] = useState(false);
  const [lostGame, setLostGame] = useState(false);
  const [letterStatuses, setLetterStatuses] = useState(generateLetterStatusMap());
  const [message, setMessage] = useState(null);
  const [cantSubmit, setCantSubmit] = useState(false);

  const solution = WORDS[Math.floor(seedrandom(randomSeed)() * WORDS.length)]

  const MESSAGES = {
    notEnoughLetters: {
      text: 'Not enough letters!',
      type: 'error',
    },
    youLost: {
      text: `You lost! The word was ${solution.toUpperCase()}`,
      type: 'loss',
    },
    youWon: {
      text: 'You won! Congratulations!',
      type: 'success',
    },
  };

  const insertLetter = useCallback((letter) => {
    if (currentGuess.length === 5) { // if we're out of space, can't insert more letters
      setCantSubmit(true);
      setTimeout(() => {
        setCantSubmit(false);
      }, "3000");
      return;
    }
    setCurrentGuess((oldCurrentGuess) => [...oldCurrentGuess, letter]);
  }, [currentGuess.length]);

  const deleteLetter = useCallback(() => {
    if (!currentGuess.length) {
      return;
    }
    setCurrentGuess((oldCurrentGuess) => oldCurrentGuess.slice(0, -1));
  }, [currentGuess.length]);

  const updateLetterStatuses = useCallback((guess) => {
    guess.forEach((letter, index) => {
      const letterStatus = getLetterStatus(letter, index, solution);
      // to preserve immutability, set state to a *new* map based off of the old one
      setLetterStatuses(new Map(letterStatuses.set(letter, letterStatus)));
    });
  }, [letterStatuses, solution]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== 5) {
      setMessage(MESSAGES.notEnoughLetters);
      setCantSubmit(true);
      setTimeout(() => {
        setMessage(null);
        setCantSubmit(false);
      }, "3000");
      return;
    }
    // check if correct - if so, set message & disable game
    if (currentGuess.join('') === solution) {
      setWonGame(true);
      setMessage(MESSAGES.youWon);
    }
    // move current guess to past guesses!
    setPastGuesses((prevPastGuesses) => {
      const newArr = [...prevPastGuesses, [...currentGuess]]
      return newArr;
    });
    // update letter statuses/colors in keyboard
    updateLetterStatuses(currentGuess);
    // (if it was the last guess, set gameOver to true)
    if (guessNumber === 6) {
      setLostGame(true);
      setMessage(MESSAGES.youLost);
    } else { // otherwise, increase guess number
      setGuessNumber(prevGuessNumber => prevGuessNumber + 1);
      setCurrentGuess([]);
    }
  }, [currentGuess, solution, guessNumber, updateLetterStatuses, MESSAGES.notEnoughLetters, MESSAGES.youLost, MESSAGES.youWon]);

  useEffect(() => {
    const handleKeyUp = (e) => {
      const { key } = e;
      if (wonGame || lostGame) { // if game is over, disable gameplay
        return;
      } else if (key === 'Enter') { // if they press "enter", enter a guess
        submitGuess();
      } else if (key === 'Backspace') { // if they press "delete", delete a letter
        deleteLetter();
      } else if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) { // if they press a letter, insert letter
        insertLetter(key);
      }
    }

    // create event listener for keyboard events
    window.document.addEventListener('keyup', handleKeyUp);
    return () => {
      window.document.removeEventListener('keyup', handleKeyUp);
    }
  }, [currentGuess, deleteLetter, insertLetter, submitGuess, lostGame, wonGame]);

  return (
    <div className="App">
      <header className="App-header">
        Sophordle
      </header>
      <div className="App-body">
        {!!message && <Message message={message} />}
        <Gameboard currentGuess={currentGuess} pastGuesses={pastGuesses} solution={solution} cantSubmit={cantSubmit} />
        <Keyboard insertLetter={insertLetter} deleteLetter={deleteLetter} submitGuess={submitGuess} letterStatuses={letterStatuses} />
      </div>
    </div>
  );
}

export default App;
