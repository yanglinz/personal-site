import { workerData, parentPort } from "worker_threads";

import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

import renderManifest from "./render-manifest.bundled.mjs";

async function executeModule({ componentName, args }) {
  const component = renderManifest[componentName];
  if (!component) {
    throw Error("Unable to render " + componentName);
  }

  parentPort.postMessage(
    ReactDOMServer.renderToString(React.createElement(component, { args }))
  );
}

executeModule(workerData);