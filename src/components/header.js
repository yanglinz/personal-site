import React from "react";
import Link from "gatsby-link";

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
      <header className="header">
        <div className="l-wrapper">
          <div className="l-inner-narrow">{header}</div>
        </div>
      </header>
    );
  }
}

const P = React.PropTypes;

Header.propTypes = {
  siteTitle: P.string.isRequired,
  location: P.object.isRequired
};

export default Header;
