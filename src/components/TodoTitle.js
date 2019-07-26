import React from "react";
import PropTypes from "prop-types";

function TodoTitle({ title, onDoubleClick }) {
  return (
    <span className="todo-title" onDoubleClick={onDoubleClick}>
      {title}
    </span>
  );
}

TodoTitle.propTypes = {
  title: PropTypes.string.isRequired,
  onDoubleClick: PropTypes.func.isRequired
};

export default TodoTitle;
