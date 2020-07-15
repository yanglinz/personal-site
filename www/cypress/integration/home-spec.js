describe("home spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("laods properly", () => {
    cy.contains(".Header-title", "Yanglin Zhao");
  });
});
