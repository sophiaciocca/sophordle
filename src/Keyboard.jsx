import './Keyboard.scss';

const letters = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

function Keyboard() {
  return (
    <div className="keyboard">
      {letters.map((rowLetters, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {rowLetters.map((letter, letterIndex) => (
            <button className="keyboard-button" key={letterIndex}>{letter}</button>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <button className="keyboard-button">del</button>
        <button className="keyboard-button">enter</button>
      </div>
    </div>
  );
}

export default Keyboard;

