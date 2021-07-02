var someVar = '2.) some data'

function someFunc() {
  return "for output - " + someOtherFunc()
}

function someOtherFunc() {
  return 2
}

export function anotherFunc() {
  return  `${someVar} ${someFunc()}`
}
console.log(`${someVar} ${someFunc()}`)
