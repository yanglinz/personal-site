import Link from "next/link";

import IconGithub from "../Icons/Github";

export default function Header() {
  return (
    <div className="Header">
      <div className="l-wide">
        <div className="Header-container">
          <div className="Header-brand">
            <h1 className="Header-title">
              <Link href="/">
                <a className="Header-title-link">Yanglin Zhao</a>
              </Link>
            </h1>
            <p className="Header-subtitle">hi (at) yanglinzhao.com</p>
          </div>

          <div className="Header-links">
            <a href="https://github.com/yanglinz">
              <IconGithub width={18} fill="#fff" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
