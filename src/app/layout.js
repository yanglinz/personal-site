import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import Header from "../components/header";
import Footer from "../components/footer";
import GridProvider from "../styles/grid-provider";

import "normalize.css/normalize.css";
import "../styles/global.scss";
import "./layout.scss";

const QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        author
        description
        title
      }
    }
  }
`;

function Layout(props) {
  const { children } = props;
  return (
    <GridProvider>
      <StaticQuery
        query={QUERY}
        render={data => (
          <React.Fragment>
            <Helmet>
              <html lang="en" />
              <title>{data.site.siteMetadata.title}</title>
              <meta
                name="description"
                content={data.site.siteMetadata.description}
              />
              <meta name="author" content={data.site.siteMetadata.author} />
            </Helmet>
            <div className="Layout">
              <Header siteTitle={data.site.siteMetadata.title} />
              <div className="Layout-content">{children}</div>
              <Footer />
            </div>
          </React.Fragment>
        )}
      />
    </GridProvider>
  );
}

export default Layout;
