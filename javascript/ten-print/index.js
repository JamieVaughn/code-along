let side = 200
let cell = 10
let canvas = document.querySelector('.canvas')
let fragment = document.createDocumentFragment()
const createRect = (x, y) => {
  let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  rect.setAttribute('height', cell)
  rect.setAttribute('width', cell)
  rect.setAttribute('x', x)
  rect.setAttribute('y', y)
  rect.setAttribute('fill', 'black')
  return rect
}

const createDiagonal = (x, y) => {
  let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  let dir = () => Math.random() > 0.5 ? 'left' : 'right'
  let status = dir()
  let points = {
    left: { x, y, x2: x + cell, y2: y + cell },
    right: { x: x + cell, y: y, x2: x, y2: y + cell },
  }
  // let pointsTreeLike = {
  //   left: { x, y, x2: x + cell, y2: y + cell },
  //   right: { x: x + cell, y: y + cell, x2: x + cell, y2: y },
  // }
  let take = points[status]
  line.setAttribute('x1', take.x)
  line.setAttribute('y1', take.y)
  line.setAttribute('x2', take.x2)
  line.setAttribute('y2', take.y2)
  line.setAttribute('stroke', 'black')
  line.setAttribute('stroke-width', '2')
  line.setAttribute('stroke-linecap', 'round')
  return line
}
for (let x = 0; x < 200; x+=cell){
  for (let y = 0; y < 200; y+=cell) {
    fragment.appendChild(createDiagonal(x, y))
  }
}
canvas.appendChild(fragment)