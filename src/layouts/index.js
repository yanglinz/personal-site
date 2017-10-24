import React from "react";

class Template extends React.Component {
  render() {
    return <div>{this.props.children()}</div>;
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object
};

export default Template;
