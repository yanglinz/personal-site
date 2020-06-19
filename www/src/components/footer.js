import React from "react";

import GithubSVG from "./icons/github";

import "./footer.scss";

function Footer() {
  return (
    <div className="Footer">
      <div className="Footer-links">
        <a href="https://github.com/yanglinz">
          <GithubSVG fill="#486581" />
        </a>
      </div>
      <div className="l-wide">
        <div className="Footer-copyright">
          Yanglin Zhao &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

export default Footer;
