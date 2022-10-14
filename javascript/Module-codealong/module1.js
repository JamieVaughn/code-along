var someVar = '1.) some data'

export function someFunc() {
  return `${someVar} for output - ${someOtherFunc()}`
}

function someOtherFunc() {
  return 1
}

console.log(someFunc())
