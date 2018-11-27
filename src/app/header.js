import React from "react";
import { Link } from "gatsby";

function Header(props) {
  const { siteTitle } = props;
  return (
    <div>
      <h1 style={{ margin: 0 }}>
        <Link to="/">{siteTitle}</Link>
      </h1>
    </div>
  );
}

export default Header;
