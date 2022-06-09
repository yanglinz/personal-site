import * as React from "react";

function FragmentSharedHeader() {
  return (
    <div className="py-4 bg-green-50 lg:py-8">
      <div className="l-base">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="m-0 text-3xl leading-snug">Yanglin Zhao</h1>
            <p>Software Engineer</p>
            <p>hi [at] yanglinzhao.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FragmentSharedHeader;
