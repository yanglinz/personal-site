---
title: Reproduce flaky tests in Playwright
date: 2026-05-04
description: A short guide on how to use Playwright's newCDPSession API to help reproduce race conditions inside flaky tests.
---
I recently dealt with a flaky Playwright test that would consistently pass on my local machine but would occasionally fail in CI. I found a neat trick to reliably reproduce flakes by throttling the CPU inside of a test by adding the following lines:

```js
let session = page.context().newCDPSession(page);

await session.send("Emulation.setCPUThrottlingRate", { rate: 5 }); // 5x slowdown
```

For the specific race condition I was encountering, this made it possible to reliably reproduce the error locally.  iSimulating a slower network can do the trick as well. You can do that via:

```js
const session = await page.context().newCDPSession(page);

await session.send("Network.emulateNetworkConditions", {
  offline: false,
  downloadThroughput: (1.5 * 1024 * 1024) / 8, // 1.5 Mbps
  uploadThroughput: (750 * 1024) / 8, // 750 Kbps
  latency: 40, // 40ms RTT
});
```

Hope you find this trick helpful in reproducing flakes inside your Playwright tests!