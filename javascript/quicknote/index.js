(function() {
  let model = {
    data: [],
    init: function () {
      if(!localStorage.notes) {
        localStorage.notes = JSON.stringify(this.data)
      }
    },
    add: function(obj) {
      this.data.push(obj)
      localStorage.notes = JSON.stringify(this.data)
    },
    getAllNotes: function () {
      if(JSON.parse(localStorage.notes).length === 0) return [{content: 'Go ahead and add a note!'}]
      return JSON.parse(localStorage.notes)
    }
  }

  let controller = {
    init: function() {
      model.init()
      view.init()
    },
    getNotes: function() {
      return model.getAllNotes()
    },
    addNote: function(note) {
      model.add({content: note})
      view.render()
    }
  }

  let view = {
    init: function() {

      this.noteList = document.querySelector('#notes')
      let newNoteForm = document.querySelector('#new-note-form')
      let newNoteContent = document.querySelector('#new-note-content')
      newNoteForm.addEventListener('submit', function(e) {
        e.preventDefault()
        controller.addNote(newNoteContent.value)
        newNoteContent.value = ''
      })
      this.render()
    },
    render: function() {
      // clears the screen
      let htmlStr = ''
      //get the notes from the model 
      //and iterate over to render each one by adding them to htmlStr
      controller.getNotes().forEach(note => {
        htmlStr += `
          <li class='note'>${note.content}</li>
        `
      })
      // set the innerHTML to htmlStr
      this.noteList.innerHTML = htmlStr
    }
  }

  controller.init()

})()
