import './Gameboard.scss';
import { GUESSES_ALLOWED, WORD_LENGTH } from './App';

function Gameboard(props) {
  console.log('IN GAMEBOARD. PROPS: ', props);
  const { currentGuess, pastGuesses } = props;
  return (
    <div className="gameboard">
      {[...Array(GUESSES_ALLOWED)].map((arrayElem, rowIndex) => (
        <div className="row" key={rowIndex}>
          {[...Array(WORD_LENGTH)].map((arrayElem, boxIndex) => (
            <div className="letterbox" id={`letterbox-${rowIndex}-${boxIndex}`} key={boxIndex}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Gameboard;