import React from "react";

import "./footer.scss";

function Footer() {
  return (
    <div className="Footer">
      <div className="l-wide">
        <div className="Footer-copyright">
          Yanglin Zhao &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

export default Footer;
