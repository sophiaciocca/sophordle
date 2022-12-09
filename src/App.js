import './App.css';
import { GUESSES_ALLOWED, WORD_LENGTH } from './gameLogic';
import Gameboard from './Gameboard';
import Keyboard from './Keyboard';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Sophordle
      </header>
      <div className="App-body">
        <Gameboard />
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
