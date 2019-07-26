import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }

  handleChange = e => {
    const { value: title } = e.target;
    this.setState({
      title
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const title = this.state.title.trim();

    if (title) this.props.onSubmit(title);

    this.setState({ title: "" });
  };

  render() {
    return (
      <form className="todo-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Что нужно сделать?"
          value={this.state.title}
          autoFocus
          onChange={this.handleChange}
        />
        <Button type="submit">Добавить</Button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Form;
