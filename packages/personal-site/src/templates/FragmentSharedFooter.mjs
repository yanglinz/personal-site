import * as React from "react";

function FragmentSharedFooter() {
  return (
    <div className="py-8 text-center">
      <div className="l-wide">
        <div>
          <span className="inline-block mx-auto text-sm">
            <a href="https://github.com/yanglinz">Github</a>
          </span>
        </div>

        <div className="pt-1 text-gray-400 text-sm">
          <span>Yanglin Zhao &copy; 2022</span>
          <span> | </span>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </div>
  );
}

export default FragmentSharedFooter;
