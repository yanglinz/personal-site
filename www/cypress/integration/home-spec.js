describe("home spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("laods properly", () => {
    cy.contains("h1.Header-title", "Yanglin Zhao");
  });
});
