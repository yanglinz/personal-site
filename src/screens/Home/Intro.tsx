export default function Intro() {
  return (
    <div className="Intro py-28">
      <div className="l-wide">
        <h1 className="m-0 text-7xl font-bold leading-none">
          Software Tinkerer
        </h1>

        <p className="m-0 mt-5 w-4/5 text-5xl leading-snug">
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
