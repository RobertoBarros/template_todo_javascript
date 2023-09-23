import Mustache from "mustachejs";

let todos = JSON.parse(localStorage.getItem("todos")) || []

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
}

const template = document.getElementById('todo-template').innerHTML
const container = document.getElementById('todosContainer');
const input = document.getElementById('input');


const btn = document.getElementById('addButton')

btn.addEventListener('click', (event) => {
  const title = input.value
  const newTodo = { title: title, done: false }
  todos.push(newTodo)
  input.value = null
  saveTodos(todos)
  refreshTodos()
});

const refreshTodos = () => {

  // Add index to todo object
  todos = todos.map((todo, index) => {
    return { ...todo, index: index }
  });

  const output = Mustache.render(template, {todos: todos})
  container.innerHTML = output;

  container.querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', () => {
      const index = input.dataset.index // get index
      todos[index].done = input.checked // set object property 'done' by index
      saveTodos(todos)
    })
  })
}

refreshTodos();










// To-do item HTML 👇
// <div class="shadow-sm rounded px-4 py-3 mb-2 border d-flex">
//   <input class="d-flex form-check-input me-1" type="checkbox">
//   <div>Replace with to-do title</div>
// </div>

// TODO: Dynamically generate a list of to-dos based on `todos` array, and display them
