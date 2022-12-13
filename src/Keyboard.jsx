import classNames from 'classnames/bind';
import { LETTER_STATUS_OPTIONS } from './Gameboard';
import './Keyboard.scss';

export const letters = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

function Keyboard(props) {
  const { insertLetter, deleteLetter, submitGuess, letterStatuses } = props;
  return (
    <div className="keyboard">
      {letters.map((rowLetters, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {rowLetters.map((letter, letterIndex) => {
            const status = letterStatuses.get(letter);
            return (
              <button className={classNames({
                'keyboard-button': true,
                'inplace': status === LETTER_STATUS_OPTIONS.inPlace,
                'outofplace': status === LETTER_STATUS_OPTIONS.outOfPlace,
                'incorrect': status === LETTER_STATUS_OPTIONS.incorrect,
              })} key={letterIndex} onClick={() => insertLetter(letter)}>{letter}</button>
            )
          })}
        </div>
      ))}
      <div className="keyboard-row">
        <button className="keyboard-button" onClick={deleteLetter}>del</button>
        <button className="keyboard-button" onClick={submitGuess}>enter</button>
      </div>
    </div>
  );
}

export default Keyboard;

