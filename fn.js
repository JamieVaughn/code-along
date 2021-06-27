

function logFractionAndRemainder (num, denom) {
  console.log(num/denom, num%denom)
  return num/denom
}
~
function calcCircleArea(radius) {
  return Math.PI * radius**2
}

function convertTempFToC (Temp, flag) {
  let options = [
    (Temp - 32) / 1.8, // formula to yeild Celsius
    Temp * 1.8 + 32  // formula to yield Fahrenheit
  ]
  return options[flag]
}

convertTempFToC(45, 0) 
// 1st param: temp[provide a temperature in either C or F], 
// 2nd param: toggle flag[provide 0 to yield C, provide 1 to yield F]
console.log(
  convertTempFToC(45, 0), 
  convertTempFToC(32, 0),
  convertTempFToC(25, 1),
) 
