import React, { Component } from "react";
import PropTypes from "prop-types";

import Checkbox from "./Chekbox";
import Button from "./Button";
import TodoTitle from "./TodoTitle";
import TodoEditForm from "./TodoEditForm";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };

    this.editRef = React.createRef();
  }

  handleEdit = title => {
    const id = this.props.todo.id;

    this.props.onEdit(id, title);

    this.editModeOff();
  };

  editModeOn = () => this.setState({ isEditing: true });

  editModeOff = () => this.setState({ isEditing: false });

  renderDisplay = () => {
    const { todo, onStatusChange, onDelete } = this.props;
    const { id, title, completed } = todo;

    const todoClasses = `todo ${completed ? "completed" : ""}`;

    return (
      <div className={todoClasses}>
        <Checkbox checked={completed} onClick={() => onStatusChange(id)} />

        <TodoTitle title={title} onDoubleClick={this.editModeOn} />

        <Button className="icon edit" icon="edit" onClick={this.editModeOn} />

        <Button
          className="icon delete"
          icon="delete"
          onClick={() => onDelete(id)}
        />
      </div>
    );
  };

  renderForm = () => {
    const { title } = this.props.todo;
    return <TodoEditForm title={title} onSubmit={this.handleEdit} />;
  };

  render = () =>
    this.state.isEditing ? this.renderForm() : this.renderDisplay();
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  onStatusChange: PropTypes.func.idRequired,
  onDelete: PropTypes.func.idRequired,
  onEdit: PropTypes.func.isRequired
};

export default Todo;
