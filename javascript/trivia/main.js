let triviaUrl = `https://opentdb.com/api.php?amount=2`
let main = document.querySelector('main#questions')

fetch(triviaUrl)
  .then(res => res.json())
  .then(data => {
    drawQuestions(data)
  })

function drawQuestions(data) {
  data.results.forEach(result => {
    console.log(result)
    main.innerHTML += `<h3>${result.category}</h3>`
    main.innerHTML += `<div>${result.question}</div>`
    let correct = `<button class="correct">${result.correct_answer}</button>`
    let other_answers = result.incorrect_answers.map(answer => `<button class="incorrect">${answer}</button>`)
    let answers = other_answers.toSpliced(0, 0, correct).sort(() => Math.random() >= 0.52 ? 1 : -1)
    console.log(answers)
    main.innerHTML += answers.join('')
  })
}