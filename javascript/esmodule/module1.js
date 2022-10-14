export var someVar = "Some data";

export function someFunc() {
    return " for output - " + someOtherFunction();
}

// this has no "export" prefixed hence cannot be used outside this module 
function someOtherFunction() {
    return 1;
}
