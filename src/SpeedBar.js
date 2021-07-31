import './SpeedBar.css';

function SpeedBar({tickSpeed, setTickSpeed}) {
    return (
        <div className="SpeedBar">
            <input className="SpeedBarSlider" type="range" min="0" max="20" id="speedRange" onChange={event => setTickSpeed(event.target.value)}></input>
            <span className="SpeedBarText">Ticks per second: {tickSpeed}</span>
        </div>
    );
}

export default SpeedBar;
