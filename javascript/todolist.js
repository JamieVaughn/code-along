/* 0.) Store a todo list in an array
Use several commands to do several things:
1.) display our todo list
2.) Add a new item to our todo list (maybe be able add multiples)
3.) Remove an item from our todo list (maybe be able to remove multiples)
4.) Reset the todo list
5.) Replaces an item in the list
6.) Marks an item as complete
*/
let todoList = [
  [], // uncompleted
  [] // completed
]
const replaceTodo = (todo, position) => {
  todoList[0].splice(position, 1, todo)
  // todoList[0].with(position, todo) // alternative replacement approach
  return todoList
}
function todosLeft() {
  return console.log('My Todo List:', todoList[0])
}
function todosCompleted () {
  return console.log('Completed todos:', todoList[1])
}
function addTodo(todo, flag = 0) {
  todoList[flag].push(todo) // concat
  return todoList
}
function removeTodo(position, flag) {
  console.log('Deleted item:', todoList[flag].splice(position, 1)) // slice
  return todoList
}
function resetTodos() {
  // todoList.splice(0, todoList.length)
  todoList[0].length = 0
  todoList[1].length = 0 // 
  return todoList
}
function markComplete(todo, position) {
  removeTodo(position, 0)
  addTodo(todo, 1)
  return todoList
}
