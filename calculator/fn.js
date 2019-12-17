function convertTemperature(temp) {
    let bool = Boolean(temp.indexOf('F') + 1) // || Boolean(temp.indexOf('f') + 1) <- could check for lower case as well, but for simplicity, assume uppercase, also Would this work without using the Boolean() wrapper?
    let index = bool ? temp.indexOf('F') : temp.indexOf('C')
    let num = Number(temp.slice(0, index))
    return bool ? (num - 32) / 1.8 : num * 1.8 + 32;
  }

  convertTemperature('546C')