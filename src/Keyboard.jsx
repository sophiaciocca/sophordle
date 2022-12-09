import './Keyboard.css';
import { GUESSES_ALLOWED, WORD_LENGTH } from './gameLogic';

const letters = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

function Keyboard() {
  return (
    <div className="keyboard">
      {letters.map((rowLetters, rowIndex) => (
        <div className="keyboard-row" index={rowIndex}>
          {rowLetters.map((letter, letterIndex) => (
            <button className="keyboard-button" index={letterIndex}>{letter}</button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;

