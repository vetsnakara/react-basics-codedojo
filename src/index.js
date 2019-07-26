import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./styles/index.css";

const root = document.querySelector("#todo-wrapper");

import todos from "../api/todos_es6";

ReactDOM.render(<App title="React Todo" todos={todos} />, root);

if (process.env.NODE_ENV === "development") module.hot.accept();
