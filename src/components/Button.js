import React from "react";
import PropTypes from "prop-types";

function Button(props) {
  const { className, icon, children, onClick, ...rest } = props;

  const content = icon ? (
    <span className="material-icons">{icon}</span>
  ) : (
    children
  );

  return (
    <button className={className} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
};

export default Button;
