import * as React from "react";

function SharedHeader(props) {
  return (
    <div className="py-4 bg-green-50 lg:py-8">
      <div className="l-base">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="m-0 text-3xl leading-snug">
              <a href="/">
                <img width="28px" src="/brand-logo.png" alt="Yanglin Zhao" />
              </a>
            </h1>
          </div>

          <nav>
            <a
              className="inline-block mr-2 text-gray-700 text-base font-bold"
              href="/"
            >
              Home
            </a>
            <a
              className="hidden inline-block mr-2 text-gray-700 text-base font-bold"
              href="/about"
            >
              About
            </a>
            <a
              className="inline-block text-gray-700 text-base font-bold"
              href="/posts"
            >
              Posts
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SharedHeader;
