import React from "react";
import Link from "gatsby-link";
import { Container } from "react-responsive-grid";

class Template extends React.Component {
  render() {
    const { location, children } = this.props;
    let header;

    let rootPath = `/`;
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`;
    }

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "inherit"
            }}
            to={"/"}
          >
            Gatsby Starter Blog
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3>
          <Link to={"/"}>Gatsby Starter Blog</Link>
        </h3>
      );
    }
    return (
      <Container>
        {header}
        {children()}
      </Container>
    );
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object
};

export default Template;
