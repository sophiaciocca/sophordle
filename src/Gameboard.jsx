import './Gameboard.scss';
import { GUESSES_ALLOWED, WORD_LENGTH } from './App';

function Gameboard(props) {
  console.log('IN GAMEBOARD. PROPS: ', props);
  const { currentGuess, pastGuesses } = props;
  const remainingEmptyRows = GUESSES_ALLOWED - 1 - pastGuesses.length;
  return (
    <div className="gameboard">
      {pastGuesses.map((pastGuess, rowIndex) => (
        <div className="row" key={rowIndex}>
          {pastGuess.map((letter, letterIndex) => (
            <div className="letterbox" key={letterIndex}>{letter}</div>
          ))}
        </div>
      ))}
      <div className="row">
        {currentGuess.map((letter, letterIndex) => (
          <div className="letterbox" key={letterIndex}>{letter}</div>
        ))}
        {[...Array(WORD_LENGTH - currentGuess.length)].map((arrayElem, boxIndex) => (
          <div className="letterbox" key={boxIndex}></div>
        ))}
      </div>
      {[...Array(remainingEmptyRows)].map((arrayElem, rowIndex) => (
        <div className="row" key={rowIndex}>
          {[...Array(WORD_LENGTH)].map((arrayElem, boxIndex) => (
            <div className="letterbox" key={boxIndex}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Gameboard;
