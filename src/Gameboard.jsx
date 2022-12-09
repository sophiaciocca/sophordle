import logo from './logo.svg';
import './Gameboard.css';
import { GUESSES_ALLOWED, WORD_LENGTH } from './gameLogic';

function Gameboard() {
  return (
        <div className="gameboard">
            {[...Array(GUESSES_ALLOWED)].map((arrayElem, rowIndex) => (
              <div className="row" key={rowIndex}>
                {[...Array(WORD_LENGTH)].map((arrayElem, boxIndex) => (
                  <div className="letterbox" key={boxIndex}>letter</div>
                ))}
              </div>
          ))}
        </div>
  );
}

export default Gameboard;