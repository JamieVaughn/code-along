// declare setup variables
const cols = 500
let playing = false
const board = []
const grid = document.querySelector('.cells')
const generations = document.querySelector('.generation')
const toggle = document.querySelector('.toggle')
const step = document.querySelector('.step')
const reset = document.querySelector('.reset')
const ruleEl = document.querySelector('.rule')
const random = document.querySelector('.random')
/* RULES: (8 conditions)
   7     6     5     4     3     2     1     0    <- index & parseInt('111', 2)
  111   110   101   100   011   010   001   000
  ◼◼◼ | ◼◼◻ | ◼◻◼ | ◼◻◻ | ◻◼◼ | ◻◼◻ | ◻◻◼ | ◻◻◻
   ◻     ◼     ◻     ◼     ◼     ◻     ◼     ◻   <- output   
   0     1     0     1     1     0     1     0   <- binary output    */
let rule = 30 // binary output = '00011110'
let randomRule = [30, 52, 57, 60, 61, 62, 66, 69, 73, 75, 79, 89, 90, 91, 110, 150]
 
let binaryRule = () => rule.toString(2).padStart(8, '0').split('').reverse().map(i => Number(i))
const lastRowCells = () => board.at(-1)
const getGeneration = () => board.length

const div = document.createElement('div')
let cloneCell = (status) => {
  const cell = div.cloneNode()
  cell.setAttribute('class', status)
  return cell
}
// Loop over first row of cols to append a div w/ its calls for each cell
const renderCells = (all) => {
  const fragment = document.createDocumentFragment()
  if(all) {
    board.flat().forEach((cell) => {
      let status = cell ? 'live' : 'dead'
      fragment.appendChild(cloneCell(status))
    })
  } else {
    board.at(-1).forEach((cell) => {
      let status = cell ? 'live' : 'dead'
      fragment.appendChild(cloneCell(status))
    })
  }
  generations.innerText = 'Generations: ' + getGeneration()
  grid.appendChild(fragment)
}

const initializeBoard = (init) => {
  grid.innerHTML = ''
  const row = []
  const seed = (cell) => init ? cell === (cols / 2) : Math.random() > 0.5
  for (let cell = 0; cell < cols; cell++) {
    row.push(seed(cell) ? 1 : 0)
  }
  board.push(row)
  renderCells()
}
initializeBoard(1)

const calculateNewRow = () => {
  let cells = lastRowCells()
  const neighbors = []
  for(let i = 0; i < cells.length; i++) {
    let left = cells[i-1] ?? cells.at(-1) // ?? 0
    let middle = cells[i]
    let right = cells[i+1] ?? cells.at(0) // ?? 0
    neighbors.push([left, middle, right])
  }
  const nextRow = neighbors.map(group => binaryRule()[parseInt(group.join(''), 2)])
  board.push(nextRow)
  renderCells()
}
setInterval(() => { // Setup interval
  if(playing && getGeneration() <= 500) calculateNewRow()
}, 50)

// Setup button event listeners
toggle.addEventListener('click', e => {
  playing = !playing
  e.target.innerText = playing ? 'Stop' : 'Start'
})
step.addEventListener('click', () => calculateNewRow())
reset.addEventListener('click', () => {
  playing = false
  toggle.innerText = 'Start'
  board.length = 0
  initializeBoard(1)
})
random.addEventListener('click', e => {
  rule = randomRule[Math.floor(Math.random() * randomRule.length)]
  ruleEl.innerText = 'Rule: ' + rule
})
