onmessage = function(event) {  
  let calcPrimes = findPrimes(event.data.from, event.data.to)
  postMessage({messageType: "PrimeList", data: calcPrimes})
}

function findPrimes(fromNum, toNum) {
  let list = []
  for (let i = fromNum; i <= toNum; i++) {
    if (i > 1) list.push(i)
  }

  let maxDiv = Math.round(Math.sqrt(toNum))
  let primes = []
  let prevState

  for (let i = 0; i < list.length; i++) {
    let failed = false
    for (let j = 2; j <= maxDiv; j++) {
      if ((list[i] != j) && (list[i] % j == 0)) {
        failed = true
      } else if ((j == maxDiv) && (failed == false)) {
        primes.push(list[i])
      } 
    }
    let curState = Math.round(i/list.length*100)
    if (curState != prevState) {
      postMessage({messageType: "Progress", data: curState})
      prevState = curState   
    }
  }
  return primes
}
