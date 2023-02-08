import { Worker } from "worker_threads";

export async function renderComponent(componentName, args) {
  const worker = new Worker("./lib/render-worker.mjs", {
    workerData: { componentName, args },
  });
  return await new Promise((resolve, reject) => {
    worker.once("message", resolve);
    worker.once("error", reject);
  });
}
