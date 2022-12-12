import './Gameboard.scss';
import { GUESSES_ALLOWED, WORD_LENGTH } from './App';

function Letterbox(props) {
  const { letter, letterIndex } = props;
  console.log('PROPS IN LETTERBOX: ', props);
  return (
    <div className="letterbox" key={letterIndex}>{letter}</div>
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
            <Letterbox letter={letter} letterIndex={letterIndex}/>
          ))}
        </div>
      ))}
      <div className="row">
        {currentGuess.map((letter, letterIndex) => (
          <Letterbox letter={letter} letterIndex={letterIndex}/>
        ))}
        {!!remainingLettersInGuess && [...Array(remainingLettersInGuess)].map((arrayElem, letterIndex) => (
          <Letterbox letter={arrayElem} letterIndex={letterIndex}/>
        ))}
      </div>
      {!!remainingEmptyRows && [...Array(remainingEmptyRows)].map((arrayElem, rowIndex) => (
        <div className="row" key={rowIndex}>
          {[...Array(WORD_LENGTH)].map((arrayElem, letterIndex) => (
            <Letterbox letter={arrayElem} letterIndex={letterIndex}/>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Gameboard;
