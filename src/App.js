import React from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import axios from "axios";

import Header from "./components/Header";
import Todo from "./components/Todo";
import Form from "./components/Form";
import Filter from "./components/Filter";

import filters from "./filterTypes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      filter: filters.ALL,
      todos: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      axios
        .get("http://localhost:3000/api/todos")
        .then(res => this.setState({ todos: res.data, loading: false }))
        .catch(this.handleError);
    }, 1000);
  }

  handleError = err => console.log(err);

  handleStatusChange = id => {
    axios
      .patch(`http://localhost:3000/api/todos/${id}`)
      .then(res => {
        this.setState({
          todos: this.state.todos.map(todo => {
            if (todo.id === id) {
              todo = res.data;
            }
            return todo;
          })
        });
      })
      .catch(this.handleError);
  };

  handleDelete = id =>
    axios
      .delete(`http://localhost:3000/api/todos/${id}`)
      .then(() => {
        this.setState({
          todos: this.state.todos.filter(todo => todo.id !== id)
        });
      })
      .catch(this.handleError);

  handleAdd = title => {
    axios
      .post("http://localhost:3000/api/todos", { title })
      .then(res =>
        this.setState({
          todos: [...this.state.todos, res.data]
        })
      )
      .catch(this.handleError);
  };

  handleEdit = (id, title) => {
    axios
      .put(`http://localhost:3000/api/todos/${id}`, { title })
      .then(res =>
        this.setState({
          todos: this.state.todos.map(todo => {
            if (todo.id === id) todo = res.data;
            return todo;
          })
        })
      )
      .catch(this.handleError);
  };

  handleFilterTodos = filter => {
    this.setState({
      filter
    });
  };

  sortTodos = todos =>
    todos.sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );

  filterTodos = (todos, filter) => {
    switch (filter) {
      case filters.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case filters.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  renderTodoList = todos => {
    if (todos.length === 0)
      return (
        <p style={{ padding: 10, textAlign: "center" }}>
          No todos yet ... Add some :)
        </p>
      );

    return (
      <ReactCSSTransitionGroup
        component="section"
        className="todo-list"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionName="slide"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onStatusChange={this.handleStatusChange}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
        ))}
      </ReactCSSTransitionGroup>
    );
  };

  render() {
    const { filter } = this.state;
    const todos = [...this.state.todos];
    const filterdTodos = this.filterTodos(todos, filter);
    const sortedTodos = this.sortTodos(filterdTodos);

    return (
      <main>
        <Header title={this.props.title} todos={todos} />

        {todos.length > 0 && (
          <Filter active={filter} onFilter={this.handleFilterTodos} />
        )}

        {this.state.loading ? (
          <p style={{ padding: 10, textAlign: "center" }}>Loading todos ...</p>
        ) : (
          this.renderTodoList(sortedTodos)
        )}

        <Form onSubmit={this.handleAdd} />
      </main>
    );
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired
};

export default App;
