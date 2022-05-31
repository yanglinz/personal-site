import { workerData, parentPort } from "worker_threads";

import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

import renderManifest from './render-manifest.bundled.mjs';

async function executeModule({ componentPath, data }) {
  const component = renderManifest[componentPath];
  if (!component) {
    throw Error("Unable to render " + componentPath)
  }

  const markup = ReactDOMServer.renderToString(
    React.createElement(component, data)
  );
  parentPort.postMessage(markup);
}

executeModule(workerData);
