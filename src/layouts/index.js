import React from "react";
import Helmet from "react-helmet";
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
        <Helmet defaultTitle="Yanglin Zhao">
          <html lang="en" />
        </Helmet>

        <Header siteTitle={siteTitle} location={location} />
        {this.props.children()}
        <Footer />
      </div>
    );
  }
}

export default Layout;
