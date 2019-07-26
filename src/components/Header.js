import React from "react";
import PropTypes from "prop-types";
import Stats from "./Stats";
import Stopwatch from "./Stopwatch";

function Header({ title, todos }) {
  return (
    <header>
      <Stats todos={todos} />
      <h1>{title}</h1>
      <Stopwatch />
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired
};

export default Header;
