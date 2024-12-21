// declare setup variables
const cols = 100
let playing = false
const grid = document.querySelector('.cells')
const showIter = document.querySelector('.iteration')
const toggle = document.querySelector('.toggle')
const step = document.querySelector('.step')
const reset = document.querySelector('.reset')
/* RULES: (8 conditions)
  111   110   101   100   011   010   001   000
  ◼◼◼ | ◼◼◻ | ◼◻◼ | ◼◻◻ | ◻◼◼ | ◻◼◻ | ◻◻◼ | ◻◻◻
   ◻     ◼     ◻     ◼     ◼     ◻     ◼     ◻   <- output   */
const rule = {
  '111': 'dead', // 0,
  '110': 'live', // 1,
  '101': 'dead', // 0,
  '100': 'live', // 1,
  '011': 'live', // 1,
  '010': 'dead', // 0,
  '001': 'live', // 1,
  '000': 'dead', // 0,
}
const rule30 = {
  '111': 'dead', // 0,
  '110': 'dead', // 0,
  '101': 'dead', // 0,
  '100': 'live', // 1,
  '011': 'live', // 1,
  '010': 'live', // 1,
  '001': 'live', // 1,
  '000': 'dead', // 0,
}
// Loop over first row of cols to append a div w/ its calls for each cell
const initializeCells = () => {
  for (let cell = 0; cell < cols; cell++) {
    let status = cell === (cols / 2) ? 'live' : 'dead'
    grid.innerHTML += `<div class="${status}"></div>`
  }
}
initializeCells()
// Function to retreive an array of the latest cells as an array of 0s and 1s
const lastRowCellsAsBinary = () => {
  const divs = document.querySelectorAll('.cells > div')
  const lastRow = Array.from(divs).slice(-cols)
  const liveOrDead = lastRow.map(cell => cell.classList?.contains('dead') ? 0 : 1) 
  return liveOrDead
}
// count grid rows to determine how many iterations have occured
const getIteration = () => grid.querySelectorAll('.cells > div').length / cols
const calculateNewRow = () => {
  showIter.innerText = 'Iteration: ' + getIteration()
  let cells = lastRowCellsAsBinary()
  const neighbors = []
  for(let i = 0; i < cells.length; i++) {
    let left = cells[i-1] ?? cells.at(-1) // ?? 0
    let middle = cells[i]
    let right = cells[i+1] ?? cells.at(0) // ?? 0
    neighbors.push([left, middle, right])
  }
  const state = neighbors.flatMap(group => rule30[group.join('')])
  const nextRow = cells.map((_, index) => `<div class="${state[index]}"></div>`)
  grid.innerHTML += nextRow.join('')
}
setInterval(() => { // Setup interval
  if(!playing || getIteration() >= 100) return // early return or breakout return
  calculateNewRow()
}, 200)

// Setup button event listeners
toggle.addEventListener('click', e => {
  playing = !playing
  e.target.innerText = playing ? 'Stop' : 'Start'
})
step.addEventListener('click', () => calculateNewRow())
reset.addEventListener('click', () => {
  playing = false
  toggle.innerText = 'Start'
  grid.innerHTML = ''
  initializeCells()
  showIter.innerText = 'Iteration: 0'
})