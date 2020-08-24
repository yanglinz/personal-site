function add(a: number, b: number): number {
  return a + b;
}

describe("dummy test", () => {
  it("should pass", () => {
    expect(1).toEqual(1);
  });

  it("should add", () => {
    expect(add(1, 1)).toEqual(2);
  });
});
