import React from "react";
import Link from "gatsby-link";
import get from "lodash/get";
import Helmet from "react-helmet";

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
    const { data } = this.props;
    const siteTitle = get(data, "site.siteMetadata.title");

    return (
      <div>
        <Helmet title={get(data, "site.siteMetadata.title")} />
      </div>
    );
  }
}

Index.propTypes = {
  route: React.PropTypes.object
};

export default Index;
