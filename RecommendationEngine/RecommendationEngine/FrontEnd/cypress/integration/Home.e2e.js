describe("Home component", () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("Has a title", () => {
        cy.get('#title').should('be.visible')
    })

    it('Has a side menu', () => {
        cy.get('.MuiDrawer-root > .MuiPaper-root').should('be.visible')
    })

    it('Has content', () => {
        cy.get('#pageLayout > :nth-child(1) > #main-container').should('exist')
        cy.get('#pageLayout > :nth-child(1) > #main-container').should('be.visible')

    })

    it('Has a top navigation bar', () => {
        cy.get('nav').should('be.visible')
    })
})