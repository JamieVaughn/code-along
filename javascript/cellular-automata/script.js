// https://natureofcode.com/cellular-automata/
// declare setup variables
const cols = 50
const limit = 100
var iter = Infinity
var stopState = iter
// Save important DOM nodes
const grid = document.querySelector('.cells')
const showIter = document.querySelector('.iteration')
const stopBtn = document.querySelector('.stop')
const start = document.querySelector('.start')
const resume = document.querySelector('.resume')
const restart = document.querySelector('.restart')
// Loop over first row of cols to append a div w/ its calls for each cell
const initializeCells = () => {
  for (let cell = 0; cell < cols; cell++) {
    const div = document.createElement('div')
    // div.setAttribute('class', Math.random() > .25 ? 'dead' : 'live')
    div.setAttribute('class', cell !== 2 ? 'dead' : 'live')
    grid.appendChild(div)
  }
}
initializeCells()
// clear cells 
const clearCells = () => grid.innerHTML = ''
// Save an array of the cells
const lastRowCells = () => Array.from(document.querySelectorAll('.cells > div')).slice(-50)
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
        !arr[i - 1] || arr[i - 1].classList?.contains('live'),
        c?.classList?.contains('live'),
        !arr[i + 1] || arr[i + 1].classList?.contains('live'),
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
      let ruliad = {
        '000': 0,
        '001': 1,
        '010': 0, // 1 cool
        '100': 1,
        '101': 0, // boring pillars
        '110': 1,
        '011': 1,
        '111': 0,
      }
      status = ruliad[situation] ? 'dead' : 'live'
     
      div.setAttribute('class', status)
      grid.appendChild(div)
    })
  }
}, 100)

start.addEventListener('click', e => {
  iter = 0
  stopState = Infinity
  start.style.setProperty('display', 'none')
  resume.style.setProperty('display', 'inline')
})

stopBtn.addEventListener('click', () => {
  stopState = iter
  iter = limit + 1
})

resume.addEventListener('click', () => {
  if(stopState === Infinity) return
  iter = stopState
})

restart.addEventListener('click', () => {
  stopState = 0
  iter = 0
  clearCells()
  initializeCells()
  start.style.setProperty('display', 'inline')
  resume.style.setProperty('display', 'none')
})