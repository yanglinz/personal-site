import React from "react";

import Footer from "../components/footer";

class Layout extends React.Component {
  render() {
    return (
      <div>
        {this.props.children()}
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object
};

export default Layout;
