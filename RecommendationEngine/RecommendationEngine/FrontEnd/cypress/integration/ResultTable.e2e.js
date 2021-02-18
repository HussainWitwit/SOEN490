describe("Result Page", () => {

    beforeEach(() => {
        cy.visit('/recommendations-results')
    })

    it("Finds the page title & subtitle", () => {
        cy.get('#title').should('be.visible')
        cy.get('#subtitle').should('be.visible')
    })

    it("Finds the searchbar", () => {
        cy.wait(500)
        cy.get('#data-testid').should('be.visible')
    })

    it("Search bar is visible", () => {
        cy.wait(500)
        cy.get('#data-testid').should('be.visible')
    })
})