describe('App E2E', () => {
    it('should have a header', () => {
        cy.visit('http://localhost:3000');

        cy.get('h1')
            .should('have.text', 'Hello, world!');
    });
});