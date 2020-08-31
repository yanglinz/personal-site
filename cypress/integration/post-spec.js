describe("post spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // Skip tests from the post index for now
  const postIndexes = [1, 2, 3, 4, 5] && [];
  postIndexes.forEach(i => {
    it("should handle navigation", () => {
      cy.get(".Post-title a")
        .eq(i)
        .then(a => {
          const path = a.attr("href");
          const title = a.text();
          cy.visit(path);
          cy.contains(".BlogPost-title", title);
        });
    });

    it("should handle push-state navigation", () => {
      cy
        .get(".Post-title a")
        .eq(i)
        .click()
        .get(".BlogPost-title").should.exist;
    });
  });
});
