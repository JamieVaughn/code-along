const ol = document.querySelector('main ol')
const title = document.querySelector('h2 .stories')

let runStories = function(path) {
  ol.innerHTML = ''
  title.innerText = path
  return fetch(`https://hacker-news.firebaseio.com/v0/${path}stories.json?print=pretty`)
    .then(response => {
      console.log(response)
      return response.json()
    }).then(data => {
      // console.log(data)
      let stories = data.slice(0, 20)
      stories.forEach(id => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            let item = `<li data-id=${data.id}>
                <span>
                  <button>⇧</button> 
                  ${data.score}
                </span>
                <a href=${data.url} target="_blank">${data.title}</a>
              </li>`
              ol.innerHTML += item
          })
          
      })

    }).catch(error => console.log(error))
}

let runTopStories = () => runStories('top')
let runNewStories = () => runStories('new')
let runBestStories = () => runStories('best')

runNewStories()

// Improvements
// 0. Add pagination buttons below stories that load next 20 links
// 1. Show more of the stories data... 
  // maybe make upvote button work, show a link to the comments
// 2. Better CSS styles
// 3. Add .active class to the last clicked nav button so it looks distinct
// 4. Make upvote button increase the story's count
