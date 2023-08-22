import path from "node:path";
import { getContentManifests } from "../src/content";

test("get basic content manifests", async () => {
  const exampleDir = path.join(__dirname, "../examples/basic");
  const manifests = await getContentManifests(
    { baseDir: exampleDir },
    exampleDir
  );
  expect(manifests).toMatchInlineSnapshot(`
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
        "path": "index.js",
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
        "path": "posts/first-post.mdoc",
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
        "path": "posts/second-post.mdoc",
        "type": "POST",
      },
    ]
  `);
});

test("get basic content manifests", async () => {
  const exampleDir = path.join(__dirname, "../examples/basic");
  const manifests = await getContentManifests(
    { baseDir: exampleDir },
    exampleDir
  );
  // Create a tmp directory
  // Generate a list of files with generateFiles
  // Assert the list of files in a snapshot
});
