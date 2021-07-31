import './Simulation.css'

let oldTickSpeed = 0
let interval = null
// use local variable, avoids full component refresh
let status = []

function Simulation({tickSpeed}) {
    const width = 30;
    const height = 30;
    const maxNumber = Math.max(width, height)

    const cellStyle = { 
        height: 50/maxNumber + "vh",
        width: 50/maxNumber + "vh",
        maxHeight: 50/maxNumber + "vw",
        maxWidth: 50/maxNumber + "vw"
    }

    function removeElementFromList(list, element) {
        let newList = []
        list.forEach(e => {
            if(e !== element) {
                newList.push(e)
            }
        });
        return newList
    }

    function countCells(x, y) {
        let count = 0
        for(let i=-1;i<2;i++) {
            for(let j=-1;j<2;j++){
                if(i!==0 || j!==0) {
                    if (x+i >= 0 && x+i < width && y+j >= 0 && y+j < height) {
                        if(status.includes((x+i)+','+(y+j))) {
                            count++
                        }
                    }
                }
            }
        }
        
        return count
    }

    function getCell(x, y) {
        return document.getElementById(x + 100*y)
    }

    function lightCell(x, y) {
        let cell = getCell(x, y)
        cell.className = 'blue'
    }

    function killCell(x, y) {
        let cell = getCell(x, y)
        cell.className = 'white'
    }

    function tickOnce() {
        let newState = []
        //light up
        status.forEach((element) => {
            let l = element.split(',')
            let x = Number(l[0])
            let y = Number(l[1])

            for(let i=-1;i<2;i++) {
                for(let j=-1;j<2;j++) {
                    if(i!==0 || j!==0) {
                        if (x+i >= 0 && x+i < width && y+j >= 0 && y+j < height) {
                            if (!status.includes((x+i)+','+(y+j)) && !newState.includes((x+i)+','+(y+j)) && countCells(x+i,y+j) === 3) {
                                newState.push((x+i)+','+(y+j))
                                lightCell(x+i, y+j)
                            }
                        }
                    }
                }
            }
        })
        //kill
        status.forEach((element) => {
            let l = element.split(',')
            let x = Number(l[0])
            let y = Number(l[1])

            const count = countCells(x, y);
            if(count === 2 || count === 3) {
                newState.push(x+','+y)
            } else {
                killCell(x, y);
            }
        })

        status = newState
    }

    if (oldTickSpeed !== tickSpeed) {
        oldTickSpeed = tickSpeed
        
        if(interval != null) {
            clearInterval(interval)
        }

        if(tickSpeed !== '0') {
            interval = setInterval(() => {
                tickOnce()
            }, 1000/tickSpeed)
        }
    }

    function toggleCell(cell) {
        const newStatus = status.includes(cell) ? removeElementFromList(status, cell) : [...status, cell]
        let l = cell.split(',')
        let x = Number(l[0])
        let y = Number(l[1])
        status.includes(cell) ? killCell(x,y) : lightCell(x,y)
        status = newStatus
    }
    
    let rows = []

    for(var i=0;i<width;i++) {
        let row = []
        for(var j=0;j<height;j++) {
            row.push(<td key={[i,j]} className={status.includes(i+','+j) ? 'blue' : 'white'} data-key={[i,j]} id={i+100*j} style={cellStyle} onClick={event => toggleCell(event.target.getAttribute('data-key'))}></td>)
        }
        rows.push(<tr key={i}>{row}</tr>)
    }

    return (
        <div className="Simulation">
            <table className="SimTable">{rows}</table>
        </div>
    );
}

export default Simulation;
