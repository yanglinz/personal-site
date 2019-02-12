import React from "react";
import { Link } from "gatsby";

import "./header.scss";

function Header(props) {
  const { siteTitle } = props;
  return (
    <div className="Header">
      <div className="l-wide">
        <div className="Header-brand">
          <h1 className="Header-title">
            <Link className="Header-title-link" to="/">
              {siteTitle}
            </Link>
          </h1>
          <span className="Header-subtitle">hi (at) yanglinzhao.com</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
