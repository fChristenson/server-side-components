const removeChildren = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }

  return node;
};

module.exports.removeChildren = removeChildren;

const buildTodoList = (document, list, todos) => {
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "todo-list__li";
    li.innerHTML = todo;
    list.appendChild(li);
  });
};

module.exports.buildTodoList = buildTodoList;
