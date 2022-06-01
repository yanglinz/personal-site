import * as React from "react";

function SharedHeader(props) {
  return (
    <div className="lg:py-16">
      <div className="l-base">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="m-0 text-base leading-snug">
              <a className="text-gray-800 text-base" href="/">
                Yanglin Zhao
              </a>
            </h1>

            <p className="text-gray-400 text-base">Software Engineer</p>
            <p className="text-gray-400 text-base">hi [at] yanglinzhao.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharedHeader;
