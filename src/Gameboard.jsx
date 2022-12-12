import classNames from 'classnames/bind';
import { GUESSES_ALLOWED, WORD_LENGTH } from './App';
import './Gameboard.scss';

const LETTER_STATUS_OPTIONS = {
  unguessed: 'UNGUESSED',
  inPlace: 'INPLACE',
  outOfPlace: 'OUTOFPLACE',
  incorrect: 'INCORRECT',
};

function Letterbox(props) {
  const { letter, letterIndex, status } = props;
  return (
    <div className={classNames({
      'letterbox': true,
      'inplace': status === LETTER_STATUS_OPTIONS.inPlace,
      'outofplace': status === LETTER_STATUS_OPTIONS.outOfPlace,
      'incorrect': status === LETTER_STATUS_OPTIONS.incorrect,
    })} key={letterIndex}>{letter}</div>
  )
}

function Gameboard(props) {
  const { currentGuess, pastGuesses } = props;
  const remainingEmptyRows = GUESSES_ALLOWED - 1 - pastGuesses.length;
  const remainingLettersInGuess = WORD_LENGTH - currentGuess.length;
  return (
    <div className="gameboard">
      {pastGuesses.map((pastGuess, rowIndex) => (
        <div className="row" key={rowIndex}>
          {pastGuess.map((letter, letterIndex) => (
            <Letterbox status={LETTER_STATUS_OPTIONS.inPlace} letter={letter} letterIndex={letterIndex}/>
          ))}
        </div>
      ))}
      <div className="row">
        {currentGuess.map((letter, letterIndex) => (
          <Letterbox status={LETTER_STATUS_OPTIONS.unguessed} letter={letter} letterIndex={letterIndex}/>
        ))}
        {!!remainingLettersInGuess && [...Array(remainingLettersInGuess)].map((arrayElem, letterIndex) => (
          <Letterbox status={LETTER_STATUS_OPTIONS.unguessed} letter={arrayElem} letterIndex={letterIndex}/>
        ))}
      </div>
      {!!remainingEmptyRows && [...Array(remainingEmptyRows)].map((arrayElem, rowIndex) => (
        <div className="row" key={rowIndex}>
          {[...Array(WORD_LENGTH)].map((arrayElem, letterIndex) => (
            <Letterbox status={LETTER_STATUS_OPTIONS.unguessed} letter={arrayElem} letterIndex={letterIndex}/>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Gameboard;
