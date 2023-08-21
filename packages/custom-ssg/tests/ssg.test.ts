import path from "node:path";
import { getContentManifests } from "../src/content";

test("get basic content manifests", async () => {
  const manifests = await getContentManifests(
    path.join(__dirname, "../examples/basic")
  );
  expect(manifests).toMatchInlineSnapshot(`
    [
      {
        "path": "examples/basic/posts/first-post.mdoc",
        "pathSegments": [
          "examples",
          "basic",
          "posts",
          "first-post.mdoc",
        ],
        "type": "POST",
      },
      {
        "path": "examples/basic/posts/second-post.mdoc",
        "pathSegments": [
          "examples",
          "basic",
          "posts",
          "second-post.mdoc",
        ],
        "type": "POST",
      },
      {
        "path": "examples/basic/index.js",
        "pathSegments": [
          "examples",
          "basic",
          "index.js",
        ],
        "type": "POST",
      },
    ]
  `);
});
