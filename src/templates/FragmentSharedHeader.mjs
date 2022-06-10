import * as React from "react";

function FragmentSharedHeader() {
  return (
    <div className="bg-stone-900 py-14 lg:py-20">
      <div className="l-base">
        <div className="flex items-center justify-between">
          <div>
            <a href="/">
              <h1 className="m-0 text-base text-white leading-snug">
                Yanglin Zhao
              </h1>
              <p className="text-base text-stone-500 leading-snug">
                Software Engineer
              </p>
              <p className="text-base text-stone-500 leading-snug">
                hi [at] yanglinzhao.com
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FragmentSharedHeader;
