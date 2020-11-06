describe('App E2E', () => {
  it('should have a layout', () => {
    cy.visit('/');

    cy.get('#pageLayout > :nth-child(1) > #main-container').should('be.visible');
  });
});
