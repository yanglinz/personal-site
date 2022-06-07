import * as React from "react";

function FragmentIndexIntro() {
  return (
    <>
      <div className="py-12 bg-green-50 md:py-14 lg:py-16">
        <div className="l-base">
          <div className="gap-4 grid-cols-6 md:grid">
            <div className="md:col-span-4 md:col-start-2">
              <p className="text-black text-3xl font-bold tracking-tight leading-normal md:text-5xl lg:text-5xl">
                Yanglin Zhao
              </p>

              <p className="text-green-500 text-3xl font-bold tracking-tight md:text-5xl md:leading-normal lg:text-5xl lg:leading-normal">
                Software Engineer
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-gray-150 py-10 border-b md:py-12 lg:py-14">
        <div className="l-base">
          <div className="gap-4 grid-cols-6 md:grid">
            <div className="md:col-span-4 md:col-start-2">
              <p className="m-0 text-black text-xl tracking-tight leading-normal md:text-2xl md:leading-normal lg:text-3xl lg:leading-normal">
                Hi there, my name is Yanglin. I'm a Software Engineer working on
                Web stuff at <a href="https://addepar.com">Addepar</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FragmentIndexIntro;
