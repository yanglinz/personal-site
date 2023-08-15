import { getContentManifests } from "../src/content";

test("example build: basic layout", () => {
  const content = getContentManifests("../examples/basic");
  expect(content).toEqual([123]);
  expect(5).toEqual(5);
});
