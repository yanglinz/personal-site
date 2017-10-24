import React from "react";
import Link from "gatsby-link";
import get from "lodash/get";
import Helmet from "react-helmet";

import Bio from "../components/Bio";
import { rhythm } from "../utils/typography";

class Index extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");

    return (
      <div>
        <Helmet title={get(this, "props.data.site.siteMetadata.title")} />
        <Bio />
      </div>
    );
  }
}

Index.propTypes = {
  route: React.PropTypes.object
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
