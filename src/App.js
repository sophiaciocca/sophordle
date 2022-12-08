import logo from './logo.svg';
import './App.css';
import { GUESSES_ALLOWED } from './gameLogic';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Sophordle
      </header>
      <div className="gameboard">
          {[...Array(GUESSES_ALLOWED)].map((elementInArray, index) => (
            <div className="row" key={index}>
              row here
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
