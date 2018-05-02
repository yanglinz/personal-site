import React from "react";

import "./intro.scss";

class Intro extends React.Component {
  render() {
    return (
      <section className="Intro">
        <div className="l-wrapper">
          <div className="l-inner-narrow">
            <h2 className="f-wn">Hi. My name is Yanglin.</h2>
            <h3 className="f-wn">
              I'm a fullstack dev and I build interactive applications.
            </h3>
          </div>
        </div>
      </section>
    );
  }
}

export default Intro;
