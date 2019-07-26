import React from "react";
import Button from "./Button";

import filters from "../filterTypes";

function Filter({ active, onFilter }) {
  return (
    <div className="filter">
      <Button
        className={`filter-btn ${active === filters.ALL &&
          "filter-btn-active"}`}
        icon="list"
        onClick={() => onFilter(filters.ALL)}
      />
      <Button
        className={`filter-btn ${active === filters.ACTIVE &&
          "filter-btn-active"}`}
        icon="check_box_outline_blank"
        onClick={() => onFilter(filters.ACTIVE)}
      />
      <Button
        className={`filter-btn ${active === filters.COMPLETED &&
          "filter-btn-active"}`}
        icon="check_box"
        onClick={() => onFilter(filters.COMPLETED)}
      />
    </div>
  );
}

export default Filter;
