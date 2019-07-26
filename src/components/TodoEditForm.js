import React, { Component } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

export class TodoEditForm extends Component {
  titleRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();

    const title = this.titleRef.current.value;

    this.props.onSubmit(title);
  };

  render() {
    return (
      <form className="todo-edit-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          defaultValue={this.props.title}
          ref={this.titleRef}
          autoFocus
        />
        <Button className="save icon" icon="save" type="submit" />
      </form>
    );
  }
}

TodoEditForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default TodoEditForm;
