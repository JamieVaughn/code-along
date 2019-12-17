// Create a basic calculator that can add, subtract, multiply & divide
// Using Arrays, Functions and EventListeners will be crucial, 
// but you may use any other techniques you would like
// See below for an outline of tasks to guide you:

// Declare your variables you need to save in the global scope up here
// Let's use a single array as a bucket to store all the user input in 
// the order that it was typed: So it will contain a number,
// then an operation, then a number
var bucket = [];

var display = document.querySelector('output');
let numbers = document.querySelector('.numbers');
let operations = document.querySelector('.operations');

// Listen for clicks on the buttons section element
    // check the event target to make sure it is a click on a valid button
        // push the values clicked into one of your arrays from above
        // update the output element to display the user input
numbers.addEventListener('click', function(e) {
    if(e.target.classList[0] == 'num'){
        bucket.push(e.target.classList[1]);
        display.innerText = arrToString(bucket)
    }
});

// Listen for clicks on the operations section element
    // check the event target to see if its a click on an 'op' button
        // push the user input into the bucket
        // upate the display to show the operation value
    // check the event target to see if its a click on the 'eq' button
        // find and save to a variable the index of the operation string in the bucket array
        // Using the index of the operation string, slice off and save the first and second numbers in the bucket array
        // Pass the two numbers and the operation string to the equalsHandler function and invoke it.
        // display the result of your equalsHandler() function
        // reset the bucket array length so its empty
    // Otherwise handle all other clicks by sending a message of "no valid selection" to the console
operations.addEventListener('click', function(e) {
    if(e.target.classList[0] == 'op') {
        bucket.push(e.target.classList[1]);
        display.innerText = arrToString(bucket)
    }else if(e.target.classList[0] == 'eq') {
        let opIndex = bucket.indexOf(bucket.find(i => typeof i === 'string'));
        let num1 = bucket.slice(0, opIndex).join('');
        let num1 = bucket.slice(opIndex+1, bucket.length).join('');
        let result = equalsHandler(op, Number(num1), number(num2));
        display.innerText = result;
        bucket.length = 0;
    } else {
        console.log('no valid selection')
    }
});
