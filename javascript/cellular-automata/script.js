// https://natureofcode.com/cellular-automata/
// https://www.youtube.com/watch?v=Ggxt06qSAe4
// https://mathworld.wolfram.com/ElementaryCellularAutomaton.html
// Save important DOM nodes
const grid = document.querySelector('.cells')
const showIter = document.querySelector('.iteration')
// declare setup variables
const cols = 100
const limit = 100
var iter = Infinity
const ruliad = {
  '000': 0,
  '001': 1,
  '010': 0, // 1 cool
  '100': 1,
  '101': 0, // boring pillars
  '110': 1,
  '011': 1,
  '111': 0,
}

// Loop over first row of cols to append a div w/ its calls for each cell
const initializeCells = () => {
  for (let cell = 0; cell < cols; cell++) {
    const div = document.createElement('div')
    div.setAttribute('class', Math.random() > .05 ? 'dead' : 'live')
    // div.setAttribute('class', cell !== 50 ? 'dead' : 'live')
    grid.appendChild(div)
  }
}

initializeCells()
// Save an array of the cells
const lastRowCells = () => Array.from(document.querySelectorAll('.cells > div')).slice(-cols)
// Setup interval
setInterval(() => {
  if(iter >= limit) {
    return
  } else {
    let cells = lastRowCells()
    iter += 1
    showIter.innerText = 'Iteration: ' + iter
    const state = cells.map((c, i, arr) => {
      return [
        // arr[i - 2] && arr[i - 2].classList?.contains('alive'),
        !arr[i - 1] ? arr.at(-1).classList?.contains('live') : arr[i - 1].classList?.contains('live'),
        c?.classList?.contains('live'),
        !arr[i + 1] ? arr[0].classList?.contains('live') : arr[i + 1].classList?.contains('live'),
        // arr[i + 2]?.classList?.contains('alive'),
      ].map(el => !el ? 0 : 1).join('')
    })
    
     /* RULES: 
     Any live cell with 3 live neighbors => dead
      Any dead cell with 2 live neighbors => live
      Any live cell with 1 live neighbor => live
      Any other dead OR live cell => dead */
    cells.forEach((cell, i) => {
      const div = document.createElement('div')
      let status = cell.getAttribute('class')
      let situation = state[i]
      status = ruliad[situation] ? 'dead' : 'live'
      div.setAttribute('class', status)
      grid.appendChild(div)
    })
  }
}, 100)
