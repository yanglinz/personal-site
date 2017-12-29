import React from "react";

import "./search-box.css";

function SearchBox(props) {
  return (
    <div className="SearchBox">
      <input
        className="SearchBox-input"
        type="search"
        name="header-search"
        placeholder="Search..."
        autoComplete="off"
      />
    </div>
  );
}

export default SearchBox;
