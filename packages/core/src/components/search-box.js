import React from "react";

import "./search-box.scss";

function SearchBox(props) {
  return (
    <div className="SearchBox">
      <input
        className="SearchBox-input f-serif"
        type="search"
        name="header-search"
        placeholder="Search..."
        autoComplete="off"
      />
    </div>
  );
}

export default SearchBox;
