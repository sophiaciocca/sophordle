import logo from './logo.svg';
import './App.css';
import { GUESSES_ALLOWED, WORD_LENGTH } from './gameLogic';
import Gameboard from './Gameboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Sophordle
      </header>
      <div className="App-body">
        <Gameboard />
      </div>
    </div>
  );
}

export default App;
