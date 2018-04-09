const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "dist")));

// our todos
const todos = ["foo", "bar", "baz"];

app.get("/", (req, res) => {
  res.render("index", { todos });
});

app.post("/todo", (req, res) => {
  todos.push(req.body.todo);
  res.json(todos);
});

module.exports = app;
