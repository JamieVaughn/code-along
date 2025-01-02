// https://www.youtube.com/watch?v=L4u7Zy_b868
// https://jason.today/falling-sand
// declare setup variables
const cols = 50
let sandCount = 0
let board = []
let nextBoard = []
// Save important DOM nodes
const grid = document.querySelector('.grid')
const reset = document.querySelector('.reset')
// create cell function
const createCell = (row, x, y) => {
  const div = document.createElement('div')
  div.setAttribute('id', `cell-${x}-${y}`)
  div.addEventListener('click', (e) => {
    e.target.classList.add('sand')
    board[y][x] = 1
    sandCount++
  })
  div.addEventListener('mouseenter', (e) => {
    if(Math.random() > 0.25) {
      e.target.classList.add(`sand-${sandCount}`)
      board[y][x] = 1
      sandCount++
    }
  })
  grid.appendChild(div)
  sandCount++
}
const createEmptyBoard = () => Array.from({length: cols}, () => Array.from({length: cols}, () => 0))
// Loop over cols squared to append a div w/ its calls for each cell
const initializeGrid = () => {
  grid.innerHTML = ''
  board = createEmptyBoard()
  nextBoard = createEmptyBoard()
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      createCell(row, cellIndex, rowIndex)
    })
  })
}
initializeGrid()

const renderBoard = () => {
  nextBoard.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      let div = grid.querySelector(`#cell-${cellIndex}-${rowIndex}`)
      div?.setAttribute('class', cell === 1 ? 'sand': '')
    })
  })
  board = nextBoard
  nextBoard = createEmptyBoard()
}
/* RULES: 
  Sand falls if nothing is below it    
  Sand rolls left or right if sand is only directly below it
  Sand stops if all three below spaces are filled  */
// let rule = {
//   '000': '010',
//   '100': '110',
//   '001': '011',
//   '101': '111',
//   '011': '111',
//   '110': '111',
//   '010': Math.random() > 0.5 ? '110' : '011',
//   '111': 'stay',
// }
// Setup interval
setInterval(() => {
  for(let row = 0; row < cols; row++){
    for(let cell = 0; cell < cols; cell++) {
      let state = board[row][cell]
      if(state === 1) {
        let surface = [
          board[row + 1]?.[cell - 1] ?? 1, // below left
          board[row + 1]?.[cell], // below middle
          board[row + 1]?.[cell + 1] ?? 1 // below right
        ].join('')
        switch(surface) {
          case '000':
          case '100':
          case '001':
          case '101':
            nextBoard[row + 1][cell] = 1
            break
          case '110':
            nextBoard[row][cell + 1] = 1
            break
          case '011':
            nextBoard[row][cell - 1] = 1
            break
          case '010': 
            nextBoard[row][cell + Math.random() > 0.5 ? -1 : 1] = 1
            break
          case '111':
          default:
            nextBoard[row][cell] = 1
            break
        }
      }
    }
  }
  renderBoard()
}, 200)

reset.addEventListener('click', initializeGrid)
