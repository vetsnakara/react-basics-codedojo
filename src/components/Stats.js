import React from "react";
import PropTypes from "prop-types";

function Stats({ todos }) {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const left = total - completed;

  return (
    <table className="stats">
      <tbody>
        <tr>
          <th>Всего:</th>
          <td>{total}</td>
        </tr>
        <tr>
          <th>Выполнено:</th>
          <td>{completed}</td>
        </tr>
        <tr>
          <th>Осталось:</th>
          <td>{left}</td>
        </tr>
      </tbody>
    </table>
  );
}

Stats.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired
};

export default Stats;
