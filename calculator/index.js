// Create a basic calculator that can add, subtract, multiply & divide
// Using Arrays, Functions and EventListeners will be crucial, 
// but you may use any other techniques you would like
// See below for an outline of tasks to guide you:


// Declare your variables you need to save in the global scope up here
// perhaps an array to contain the first number input 
// and a second array for the second number input
// You'll want to track the "current array" in a global variable
// and you may want to save the operation into a variable
var first = [];
var second = [];
var current = first;
var result = [];
var op;
var display = document.querySelector('output');

let numbers = document.querySelector('.numbers');
let operations = document.querySelector('.operations');

// Listen for clicks on the buttons section element
    // check the event target to make sure it is a click on a valid button
    // push the values clicked into one of your arrays from above
    // update the output element to display the user input
numbers.addEventListener('click', function(e) {
    if(e.target.classList[0] == 'num'){
        display.innerText = '';
        current.push(e.target.classList[1]);
        display.innerText = arrToString(current)
    }
})



// Listen for clicks on the operations section element
    // check the event target to see if its a click on an 'op' button
        // update the current array to the second array
        // save the op value into the op variable
        // upate the display to show the operation value
    // check the event target to see if its a click on the 'eq' button
        // update the current array to the first array
        // display the result of your equalsHandler() function
        // reset the first and second arrays and the operation variable to be empty
    // Otherwise handle all other clicks by sending a message of "no valid selection" to the console
operations.addEventListener('click', function(e) {
    if(e.target.classList[0] == 'op') {
        current = second
        op = e.target.classList[1]
        display.innerText = op
    }else if(e.target.classList[0] == 'eq') {
        current = first
        let result = equalsHandler(op, arrToString(first), arrToString(second));
        display.innerText = result;
        first.length = 0
        second.length = 0
        op = ''
    } else {
        console.log('no valid selection')
    }
})
    
    
    