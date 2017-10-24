import React from "react";
import Link from "gatsby-link";
import get from "lodash/get";
import Helmet from "react-helmet";

import Header from "../components/header";

import "../styles/main.scss";

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

class Index extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = get(data, "site.siteMetadata.title");

    return (
      <div>
        <Helmet title={get(data, "site.siteMetadata.title")} />
        <Header siteTitle={siteTitle} location={location} />
      </div>
    );
  }
}

Index.propTypes = {
  route: React.PropTypes.object
};

export default Index;
