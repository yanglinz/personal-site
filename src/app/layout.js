import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import Header from "../components/header";
import Footer from "../components/footer";

import "normalize.css/normalize.css";
import "../styles/global.scss";

const QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

function Layout(props) {
  const { children } = props;
  return (
    <StaticQuery
      query={QUERY}
      render={data => (
        <React.Fragment>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: "description", content: "Personal site of Yanglin Zhao" },
              { name: "keywords", content: "programming" }
            ]}
          >
            <html lang="en" />
          </Helmet>
          <Header siteTitle={data.site.siteMetadata.title} />
          {children}
          <Footer />
        </React.Fragment>
      )}
    />
  );
}

export default Layout;
