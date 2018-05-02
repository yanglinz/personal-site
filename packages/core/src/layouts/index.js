import React from "react";
import get from "lodash/get";

import Header from "../components/header";
import Footer from "../components/footer";

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

class Layout extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = get(data, "site.siteMetadata.title");
    return (
      <div>
        <Header siteTitle={siteTitle} location={location} />
        {this.props.children()}
        <Footer />
      </div>
    );
  }
}

export default Layout;
