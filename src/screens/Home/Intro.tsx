import styles from "./Intro.module.css";

export default function HomeIntro() {
  return (
    <div className="Intro">
      <div className="l-wide">
        <div className="Intro-border-top" />
        <div className="Intro-text-parent">
          <h1 className="Intro-text">Software Tinkerer</h1>
          <p className="About-text">
            Hello{" "}
            <span role="img" aria-label="Waving hand">
              &#x1F44B;.
            </span>{" "}
            I'm a software engineer based in Washington DC. I mainly make things
            that run in browsers. I currently work at{" "}
            <a href="https://www.pbs.org/">PBS</a> as a Principal Engineer to
            help make high quality media accessible.
          </p>
        </div>
      </div>
    </div>
  );
}
