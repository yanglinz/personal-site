import React from "react";

class Intro extends React.Component {
  render() {
    return (
      <section className="intro">
        <div className="l-wrapper">
          <div className="l-inner-narrow l-spacing">
            <p className="f1" css={{ margin: "0.5em 0" }}>
              Hi. I'm Yanglin.
            </p>
            <p className="f2" css={{ margin: "0.5em 0" }}>
              I currently work at PBS as a frontend engineer, and I’m passionate
              about building interactive applications.
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default Intro;
