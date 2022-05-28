import path from "path";
import url from "url";

import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export async function renderComponent(componentPath, data) {
  const componentAbsPath = path.resolve(__dirname, "..", componentPath);
  const relativePath = path.relative(__dirname, componentAbsPath);
  const componentModule = await import(relativePath);
  const component = componentModule.default;
  return ReactDOMServer.renderToString(React.createElement(component, data));
}
