import path from "node:path";
import { getVirtualFiles } from "../src/content";

test("get basic content virtual files", async () => {
  const exampleDir = path.join(__dirname, "../examples/basic");
  const vfs = await getVirtualFiles(
    { outputDir: "/dev/null", baseDir: exampleDir },
    exampleDir
  );
  expect(vfs).toMatchInlineSnapshot(`
    [
      {
        "ast": Node {
          "$$mdtype": "Node",
          "annotations": [],
          "attributes": {},
          "children": [],
          "errors": [],
          "inline": false,
          "lines": [],
          "slots": {},
          "tag": undefined,
          "type": "document",
        },
        "outputPath": "index.html",
        "sourcePath": "index.js",
        "type": "POST",
      },
      {
        "ast": Node {
          "$$mdtype": "Node",
          "annotations": [],
          "attributes": {
            "frontmatter": "title: First post",
          },
          "children": [
            Node {
              "$$mdtype": "Node",
              "annotations": [],
              "attributes": {},
              "children": [
                Node {
                  "$$mdtype": "Node",
                  "annotations": [],
                  "attributes": {},
                  "children": [
                    Node {
                      "$$mdtype": "Node",
                      "annotations": [],
                      "attributes": {
                        "content": "This is the first post!",
                      },
                      "children": [],
                      "errors": [],
                      "inline": true,
                      "lines": [
                        4,
                        5,
                      ],
                      "location": {
                        "end": {
                          "character": undefined,
                          "line": 5,
                        },
                        "file": undefined,
                        "start": {
                          "character": undefined,
                          "line": 4,
                        },
                      },
                      "slots": {},
                      "tag": undefined,
                      "type": "text",
                    },
                  ],
                  "errors": [],
                  "inline": false,
                  "lines": [
                    4,
                    5,
                  ],
                  "location": {
                    "end": {
                      "character": undefined,
                      "line": 5,
                    },
                    "file": undefined,
                    "start": {
                      "character": undefined,
                      "line": 4,
                    },
                  },
                  "slots": {},
                  "tag": undefined,
                  "type": "inline",
                },
              ],
              "errors": [],
              "inline": false,
              "lines": [
                4,
                5,
              ],
              "location": {
                "end": {
                  "character": undefined,
                  "line": 5,
                },
                "file": undefined,
                "start": {
                  "character": undefined,
                  "line": 4,
                },
              },
              "slots": {},
              "tag": undefined,
              "type": "paragraph",
            },
          ],
          "errors": [],
          "inline": false,
          "lines": [],
          "slots": {},
          "tag": undefined,
          "type": "document",
        },
        "outputPath": "posts/first-post.html",
        "sourcePath": "posts/first-post.mdoc",
        "type": "POST",
      },
      {
        "ast": Node {
          "$$mdtype": "Node",
          "annotations": [],
          "attributes": {
            "frontmatter": "title: Second post",
          },
          "children": [
            Node {
              "$$mdtype": "Node",
              "annotations": [],
              "attributes": {},
              "children": [
                Node {
                  "$$mdtype": "Node",
                  "annotations": [],
                  "attributes": {},
                  "children": [
                    Node {
                      "$$mdtype": "Node",
                      "annotations": [],
                      "attributes": {
                        "content": "This is the second post!",
                      },
                      "children": [],
                      "errors": [],
                      "inline": true,
                      "lines": [
                        4,
                        5,
                      ],
                      "location": {
                        "end": {
                          "character": undefined,
                          "line": 5,
                        },
                        "file": undefined,
                        "start": {
                          "character": undefined,
                          "line": 4,
                        },
                      },
                      "slots": {},
                      "tag": undefined,
                      "type": "text",
                    },
                  ],
                  "errors": [],
                  "inline": false,
                  "lines": [
                    4,
                    5,
                  ],
                  "location": {
                    "end": {
                      "character": undefined,
                      "line": 5,
                    },
                    "file": undefined,
                    "start": {
                      "character": undefined,
                      "line": 4,
                    },
                  },
                  "slots": {},
                  "tag": undefined,
                  "type": "inline",
                },
              ],
              "errors": [],
              "inline": false,
              "lines": [
                4,
                5,
              ],
              "location": {
                "end": {
                  "character": undefined,
                  "line": 5,
                },
                "file": undefined,
                "start": {
                  "character": undefined,
                  "line": 4,
                },
              },
              "slots": {},
              "tag": undefined,
              "type": "paragraph",
            },
          ],
          "errors": [],
          "inline": false,
          "lines": [],
          "slots": {},
          "tag": undefined,
          "type": "document",
        },
        "outputPath": "posts/second-post.html",
        "sourcePath": "posts/second-post.mdoc",
        "type": "POST",
      },
    ]
  `);
});
