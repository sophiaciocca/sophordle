import classNames from 'classnames/bind';
import { GUESSES_ALLOWED, WORD_LENGTH } from './App';
import { getGuessStatus } from './gameLogicUtils';
import './Gameboard.scss';

export const LETTER_STATUS_OPTIONS = {
  unguessed: 'UNGUESSED',
  inPlace: 'INPLACE',
  outOfPlace: 'OUTOFPLACE',
  incorrect: 'INCORRECT',
};

function Letterbox(props) {
  const { letter, status } = props;
  return (
    <div className={classNames({
      'letterbox': true,
      'inplace': status === LETTER_STATUS_OPTIONS.inPlace,
      'outofplace': status === LETTER_STATUS_OPTIONS.outOfPlace,
      'incorrect': status === LETTER_STATUS_OPTIONS.incorrect,
    })} data-testid="letterbox">{letter}</div>
  )
}

function CompletedRow(props) {
  const { pastGuess, solution } = props;
  const statuses = getGuessStatus(solution, pastGuess);
  return (
    <div className="row">
      {pastGuess.map((letter, letterIndex) => (
        <Letterbox status={statuses[letterIndex]} letter={letter} key={letterIndex} />
      ))}
    </div>
  )
}

function Gameboard(props) {
  const { currentGuess, pastGuesses, solution, cantSubmit } = props;
  const remainingEmptyRows = GUESSES_ALLOWED - 1 - pastGuesses.length;
  const remainingLettersInGuess = WORD_LENGTH - currentGuess.length;
  return (
    <div className="gameboard">
      {pastGuesses.map((pastGuess, rowIndex) => (
        <CompletedRow pastGuess={pastGuess} key={rowIndex} solution={solution} />
      ))}
      {pastGuesses.length < GUESSES_ALLOWED && <div className={classNames({
        'row': true,
        'cantsubmit': cantSubmit === true,
      })}>
        {currentGuess.map((letter, letterIndex) => (
          <Letterbox status={LETTER_STATUS_OPTIONS.unguessed} key={letterIndex} letter={letter} letterIndex={letterIndex} />
        ))}
        {!!remainingLettersInGuess && [...Array(remainingLettersInGuess)].map((arrayElem, letterIndex) => (
          <Letterbox status={LETTER_STATUS_OPTIONS.unguessed} key={letterIndex} letter={arrayElem} letterIndex={letterIndex} />
        ))}
      </div>}
      {remainingEmptyRows > 0 && [...Array(remainingEmptyRows)].map((arrayElem, rowIndex) => (
        <div className="row" key={rowIndex}>
          {[...Array(WORD_LENGTH)].map((arrayElem, letterIndex) => (
            <Letterbox status={LETTER_STATUS_OPTIONS.unguessed} key={letterIndex} letter={arrayElem} letterIndex={letterIndex} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Gameboard;
