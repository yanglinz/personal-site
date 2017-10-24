import React from "react";

class Intro extends React.Component {
  render() {
    return (
      <div>
        <h1 css={{ fontSize: "100px", margin: 0 }}>Hi.</h1>
        <p css={{ fontSize: "99px", fontWeight: "bold", margin: 0 }}>
          I'm Yanglin.
        </p>
        <p css={{ fontSize: "60px", fontWeight: "bold", margin: 0 }}>
          I currently work at PBS as a frontend engineer, and I’m passionate
          about building interactive applications.
        </p>
      </div>
    );
  }
}

export default Intro;
