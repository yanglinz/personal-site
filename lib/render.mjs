import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

export async function renderComponent(componentPath, data) {
  const componentModule = await import(componentPath);
  const component = componentModule.default;
  return ReactDOMServer.renderToString(React.createElement(component, data));
}
