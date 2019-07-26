"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");
const morgan = require("morgan");
const cors = require("cors");

const todos = require("./api/todos");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.get("/api/todos", (req, res) => {
  return res.send(todos);
});

app.post("/api/todos", (req, res) => {
  const todo = {
    id: uuid(),
    title: req.body.title,
    completed: false
  };

  todos.push(todo);

  res.send(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find(todo => todo.id === req.params.id);

  if (!todo) return res.sendStatus(404);

  todo.title = req.body.title;

  res.json(todo);
});

app.patch("/api/todos/:id", (req, res) => {
  const todo = todos.find(todo => todo.id === req.params.id);

  if (!todo) return res.sendStatus(404);

  todo.completed = !todo.completed;

  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex(todo => todo.id === req.params.id);

  console.log(req.params.id);

  if (index === -1) return res.sendStatus(404);

  todos.splice(index, 1);

  res.sendStatus(204);
});

// app.get("/", (req, res) => {
//   fs.readFile(`${__dirname}/public/index.html`, (error, html) => {
//     if (error) throw error;

//     res.setHeader("Content-Type", "text/html");
//     res.end(html);
//   });
// });

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist"));
});

app.listen(app.get("port"), () =>
  console.log(`Server is listening: http://localhost:${app.get("port")}`)
);
