import React from "react";
import Link from "gatsby-link";

// import "./header.scss";

function Brand(props) {
  const { siteTitle } = props;
  return (
    <div className="Brand">
      <h1 className="Brand-title">
        <Link to="/">Yanglin Zhao</Link>
      </h1>
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
        <Brand siteTitle={siteTitle} />
      </header>
    );
  }
}

export default Header;
