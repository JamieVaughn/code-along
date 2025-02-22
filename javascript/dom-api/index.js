// let body = document.body // how can I select the body?
let div = document.querySelector('.contact')
let output = document.querySelector('output ul')
let form = document.createElement('form') // how to create an element?
let header = document.createElement('header')
let label = document.createElement('label')
let input = document.createElement('input')
let button = document.createElement('button')
// How to add text nodes for header and button?
let title = document.createTextNode('Contact Me')
header.appendChild(title)
button.innerText = 'Submit'
// how to add attributes"
label.setAttribute('for', 'contact') // how to set an id and a for attr?
input.setAttribute('type', 'text')
input.setAttribute('id', 'contact')
// button.setAttribute() // set a type of 'submit'
div.appendChild(form) // how would I append my form?
form.appendChild(header)
form.appendChild(label)
label.appendChild(input)
form.appendChild(button)

// div.innerHTML = `<form>
// <header>New Form</header>
// <label for=""><input type="text"></label>
// <button>Submit new form</button>
// </form>`



// listen to a click on the button
// console.log(input.value)
button.addEventListener('click', function(e) {
    e.preventDefault()
    console.log(input.value)
    output.innerHTML += stampMe(input.value)
})


// Challenge #3
function stampMe (name) {
  let today = new Date().toUTCString()

  return `
    <li class='stamp'>
      <p>${name}</p>
      <p>${today}</p>
    </li>
  `
}
