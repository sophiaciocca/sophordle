import './Keyboard.scss';

const letters = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

function Keyboard(props) {
  const { insertLetter, deleteLetter, submitGuess } = props;
  return (
    <div className="keyboard">
      {letters.map((rowLetters, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {rowLetters.map((letter, letterIndex) => (
            <button className="keyboard-button" key={letterIndex} onClick={() => insertLetter(letter)}>{letter}</button>
          ))}
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

