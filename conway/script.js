// declare setup variables
const cols = 50
const limit = 100
var iter = Infinity
var stopState = iter
// Save important DOM nodes
const grid = document.querySelector('.conway')
const showIter = document.querySelector('.iteration')
const stopBtn = document.querySelector('.stop')
const start = document.querySelector('.start')
const resume = document.querySelector('.resume')
const restart = document.querySelector('.restart')
// Loop over cols squared to append a div w/ its calls for each cell
for (let cell = 0; cell < cols**2; cell++) {
  const div = document.createElement('div')
  div.setAttribute('class', Math.random() > .25 ? 'dead' : 'live')
  grid.appendChild(div)
}
// Save an array of the cells
const cells = Array.from(document.querySelectorAll('.conway > div'))
// Setup interval
setInterval(() => {
  if(iter >= limit) {
    return
  } else {
    iter += 1
    showIter.innerText = 'Iteration: ' + iter
    const state = cells.map((c, i, arr) => {
      return [
        arr[i - 1] && arr[i - 1].getAttribute('class'),
        arr[i + 1]?.getAttribute('class'),
        arr[i - cols]?.getAttribute('class'),
        arr[i - cols - 1]?.getAttribute('class'),
        arr[i - cols + 1]?.getAttribute('class'),
        arr[i + cols]?.getAttribute('class'),
        arr[i + cols - 1]?.getAttribute('class'),
        arr[i + cols + 1]?.getAttribute('class'),
      ].reduce((acc, cur) => {
        if(cur) acc[cur] += 1
        return acc
      }, {dead: 0, live: 0})
    })
     /* RULES: 
      Any live cell with 2 or 3 live neighbors => live
      Any dead cell with 3 live neighbors => live
      Any other dead OR live cell => dead */
    cells.forEach((cell, i) => {
      // let isAlive = cell.getAttribute('class') === 'live'
      let isAlive = cell.classList.value.includes('live')
      let liveNeighbors = state[i].live

     if (isAlive && [2, 3].includes(liveNeighbors)) {
        cell.setAttribute('class', 'live')
      } else if (!isAlive && liveNeighbors === 3) {
        cell.setAttribute('class', 'live')
      } else {
        cell.setAttribute('class', 'dead')
      }
      // alternative if style:
      // if(liveNeighbors === 3) {
      //   cell.setAttribute('class', 'live')
      // } else if (isAlive && liveNeighbors === 2) {
      //   cell.setAttribute('class', 'live')
      // } else {
      //   cell.setAttribute('class', 'dead')
      // }
      // alternative switch style
      // switch(liveNeighbors) {
      //   case 2:
      //     cell.setAttribute('class', isAlive ? 'live' : 'dead')
      //     break
      //   case 3:
      //     cell.setAttribute('class', 'live')
      //     break
      //   default:
      //     cell.setAttribute('class', 'dead')
      //     break
      // }
    })

  }
}, 100)

start.addEventListener('click', e => {
  iter = 0
})

stopBtn.addEventListener('click', () => {
  stopState = iter
  iter = limit + 1
})

resume.addEventListener('click', () => {
  iter = stopState
})

restart.addEventListener('click', () => {
  iter = 0
  cells.forEach(cell => {
    cell.setAttribute('class', Math.random() > .25 ? 'dead' : 'live')
  })
})
