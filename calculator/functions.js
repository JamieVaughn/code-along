// Declare your utility functions in this file
// See if you can create pure functions here 
// which you would then call in your index.js file


// Write a function to add two numbers
function add(num1, num2) {
    return Number(num1) + Number(num2)
}
// Write a function to subtract two numbers
function subtract(num1, num2) {
    return num1 - num2
  }
// Write a function to multiply two numbers
function multiply(num1, num2) {
    return num1 * num2
  }
// Write a function to divide two numbers
function divide(num1, num2) {
    return num1 / num2
  }
// Write a function that accepts a string representing 
// an operation and two numbers 
// and returns a numerical result 
// (use your functions from above within this function)
function equalsHandler(op, first, second){
    switch(op) {
        case 'add': 
            return add(first, second)
            break;
        case 'subtract': 
            return subtract(first, second)
            break
        case 'multiply':
            return multiply(first, second)
            break
        case 'divide': 
            return divide(first, second)
            break
        default: 
            return 'error'
    }
}


// write a function that accepts an array of many single digits
// and outputs them as a string representing one number
function arrToString(arr) {
    return arr.join('').toString();
} 

  
  
  
  
  