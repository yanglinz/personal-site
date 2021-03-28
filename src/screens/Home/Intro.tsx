import styles from "./Intro.module.css";

export default function Intro() {
  return (
    <div className={styles.intro}>
      <div className="l-wide">
        <h1 className={styles.heading}>Software Tinkerer</h1>

        <p className={styles.subheading}>
          Hello{" "}
          <span role="img" aria-label="Waving hand">
            &#x1F44B;.
          </span>{" "}
          I'm a software engineer based in Washington DC. I mainly make things
          that run in browsers. I currently work at{" "}
          <a href="https://www.pbs.org/">PBS</a> as a Principal Engineer to help
          make high quality media accessible.
        </p>
      </div>
    </div>
  );
}
