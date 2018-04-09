const styles = require("./todoList.css");
const Store = require("../../common/store");
const reducer = require("./lib/reducer");
const { UPDATE_TODOS, INIT_TODO_LIST } = require("./lib/actions");
const { removeChildren, buildTodoList } = require("./lib/rendering");

// using custom attributes will scale better than css classes/id's
const numberOfTodos = document.querySelector("[data-js=number-of-todos]");
const form = document.querySelector("[data-js=todo-form]");
const list = document.querySelector("[data-js=todo-list]");
const textField = document.querySelector("[data-js=todo-field]");

// clearly communicate what was missing
if (!numberOfTodos) throw new Error("number-of-todos not found");
if (!form) throw new Error("todo-form not found");
if (!list) throw new Error("todo-list not found");
if (!textField) throw new Error("todo-field not found");

// subscribe to events
Store.subscribe((state, action) => {
  switch (action.type) {
    case UPDATE_TODOS:
      removeChildren(list);
      buildTodoList(document, list, state.todoList.todos);
      numberOfTodos.textContent = state.todoList.todos.length;
      break;

    default:
      break;
  }
});

// add our own module to hold state for this component
Store.addModule("todoList", reducer);

// we init our todos
const todos = Array.from(list.children).map(e => e.textContent);
Store.dispatch({ type: INIT_TODO_LIST, todoList: { todos } });

form.addEventListener("submit", async e => {
  e.preventDefault();
  const todo = textField.value;
  const res = await fetch("http://localhost:3000/todo", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ todo })
  });
  const todos = await res.json();
  // we dispatch so that anyone who wants to know what happened is notified
  Store.dispatch({ type: UPDATE_TODOS, todos });
});
