import React from "react";
import Link from "gatsby-link";

import "./header.scss";

function Brand(props) {
  const { siteTitle } = props;
  return (
    <div className="Brand">
      <h1>
        <Link to="/">
          <span className="Brand-tag-bot">Yanglin Zhao</span>
        </Link>
      </h1>
      <p className="Brand-tag-bot">Fullstack Software Dev</p>
    </div>
  );
}

class Header extends React.Component {
  render() {
    const { siteTitle, location } = this.props;

    let rootPath = `/`;
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`;
    }

    let header;
    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
      );
    } else {
      header = (
        <h3>
          <Link to="/">{siteTitle}</Link>
        </h3>
      );
    }

    return (
      <header className="Header">
        <div className="l-wrapper">
          <div className="l-inner-narrow">
            <div className="Header-l-wrapper">
              <div className="Header-l-brand">
                <Brand siteTitle={siteTitle} />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
