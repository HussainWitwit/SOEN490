describe('App E2E', () => {
  it('should have a layout', () => {
    cy.visit('/');

    cy.get('.right-main-context').should('be.visible');
    cy.get(':nth-child(1) > .MuiDrawer-root > .MuiPaper-root').should('be.visible');
    cy.get('[fill-rule="evenodd"]').should('be.visible');
    cy.get('#main-containter > :nth-child(1)').should('be.visible');
    cy.get('#grid-container1').should('be.visible');
  });

});
