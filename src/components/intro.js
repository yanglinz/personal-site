import React from "react";

import "./intro.css";

class Intro extends React.Component {
  render() {
    return (
      <section className="Intro">
        <div className="l-wrapper">
          <div className="l-inner-narrow">
            <h2 className="f-wn">Hello, my name is Yanglin.</h2>
            <h3 className="f-wn">
              I'm a software engineer passionate about building interactive
              applications.
            </h3>
          </div>
        </div>
      </section>
    );
  }
}

export default Intro;
