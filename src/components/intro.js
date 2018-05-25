import React from "react";

import "./intro.scss";

class Intro extends React.Component {
  render() {
    return (
      <section className="Intro">
        <div className="l-wrapper">
          <h2 className="Intro-primary">Hi. My name is Yanglin.</h2>
          <h3 className="Intro-secondary">
            I'm a fullstack software developer and I build interactive applications.
          </h3>
        </div>
      </section>
    );
  }
}

export default Intro;
