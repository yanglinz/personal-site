import IconGithub from "../Icons/Github";

export default function Header() {
  return (
    <div className="Header">
      <div className="l-wide">
        <div className="Header-container">
          <div className="Header-brand">
            <h1 className="Header-title">
              <a className="Header-title-link" href="/">
                Yanglin Zhao
              </a>
            </h1>
            <p className="Header-subtitle">hi (at) yanglinzhao.com</p>
          </div>

          <div className="Header-links">
            <a href="https://github.com/yanglinz">
              <IconGithub width={32} fill="#fff" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
