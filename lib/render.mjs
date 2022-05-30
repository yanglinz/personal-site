import { Worker } from "worker_threads";

export async function renderComponent(componentPath, data) {
  const clonedData = {}; // TODO: Derive from data
  const worker = new Worker("./lib/render-worker.mjs", {
    workerData: { componentPath, data: clonedData }
  });
  return await new Promise((resolve, reject) => {
    worker.once("message", resolve);
    worker.once("error", reject);
  });
}
