export default function Intro() {
  return (
    <div className="Intro py-16 lg:py-28">
      <div className="l-wide">
        <h1 className="m-0 text-gray-900 text-5xl font-bold leading-none lg:text-7xl">
          Software Tinkerer
        </h1>

        <p className="m-0 mt-5 w-4/5 text-gray-900 text-3xl leading-snug lg:mt-7 lg:text-5xl lg:leading-snug">
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
