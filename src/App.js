import './App.css';
import SpeedBar from './SpeedBar';
import Simulation from './Simulation';
import { useState } from 'react'

function App() {
  const [tickSpeed, setTickSpeed] = useState(0)

  return (
    <div className="App">
      <SpeedBar tickSpeed={tickSpeed} setTickSpeed={setTickSpeed}/>
      <Simulation tickSpeed={tickSpeed}/>
    </div>
  );
}

export default App;
