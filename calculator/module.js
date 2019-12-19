const myCalculatorModule = (function (){
    // private variables, functions, objects, arrays
    function add(num1, num2) {
        return secret + Number(num1) + Number(num2)
    }
    function subtract(num1, num2) {
        return num1 - num2
    }
    function multiply(num1, num2) {
        return num1 * num2
    }
    function divide(num1, num2) {
        return num1 / num2
    }
    return {
        // public api, vars, etc
        equalsHandler: function (op, first, second){
            switch(op) {
                case 'add': 
                    return add(first, second)
                case 'subtract': 
                    return subtract(first, second)
                case 'multiply':
                    return multiply(first, second)
                case 'divide': 
                    return divide(first, second)
                default: 
                    return 'error'
            }
        },
        arrToString: function (arr) {

            return arr.join('').toString()+private();
        } 
    }
}())
  