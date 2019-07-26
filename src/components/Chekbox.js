import React from "react";
import PropTypes from "prop-types";

function Checkbox({ checked, onClick }) {
  const type = checked ? "check_box" : "check_box_outline_blank";

  return (
    <button className="checkbox icon" onClick={onClick}>
      <span className="material-icons">{type}</span>
    </button>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Checkbox;
