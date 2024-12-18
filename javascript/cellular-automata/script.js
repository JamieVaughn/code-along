// declare setup variables
const cols = 100
const limit = 100
let playing = false
const grid = document.querySelector('.cells')
const showIter = document.querySelector('.iteration')
const toggle = document.querySelector('.toggle')
const step = document.querySelector('.step')
const reset = document.querySelector('.reset')
/* RULES: (8 conditions)
  111   101   110   011   100   001   010   000
  ◼◼◼ | ◼◻◼ | ◼◼◻ | ◻◼◼ | ◼◻◻ | ◻◻◼ | ◻◼◻ | ◻◻◻
   ◻     ◻     ◼     ◼     ◼     ◼     ◻     ◻   <- output   */
const rule = {
  '111': 'dead', // 0,
  '101': 'dead', // 0,
  '110': 'live', // 1,
  '011': 'live', // 1,
  '100': 'live', // 1,
  '001': 'live', // 1,
  '010': 'dead', // 0,
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
    neighbors.push([cells[i-1] ?? 0, cells[i], cells[i+1] ?? 0])
  }
  const state = neighbors.flatMap(group => rule[group.join('')])
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