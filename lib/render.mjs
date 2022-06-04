import { Worker } from "worker_threads";

import datefns from "date-fns";

function clone(o) {
  return JSON.parse(JSON.stringify(o));
}

export async function renderComponent(componentPath, data) {
  let posts = data.collections.post;

  posts = posts.map((p) => {
    const { title, description, date, page, published } = p.data;
    const formattedDate = datefns.format(date, "MM/dd/yyyy");
    return { title, description, date, formattedDate, page, published };
  });

  const clonedData = {
    page: clone(data.page),
    posts: clone(posts),
  };
  const worker = new Worker("./lib/render-worker.mjs", {
    workerData: { componentPath, data: clonedData },
  });
  return await new Promise((resolve, reject) => {
    worker.once("message", resolve);
    worker.once("error", reject);
  });
}
