import { getContentManifests } from "../src/content";

test("get basic content manifests", () => {
  const manifests = getContentManifests("../examples/basic");
  expect(manifests).toMatchInlineSnapshot();
});
