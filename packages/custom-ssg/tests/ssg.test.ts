import { getContentTree } from '../src/index';

test("example build: simple", () => {
  const content = getContentTree(".");
  expect(content).toEqual([123])
  expect(5).toEqual(5);
});
