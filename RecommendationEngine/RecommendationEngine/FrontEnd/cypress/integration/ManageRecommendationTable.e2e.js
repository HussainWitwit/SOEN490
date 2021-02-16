 
describe("Manage Recommendation Table", () => {

    beforeEach(() => {
        cy.visit('/recommendations-manage')
    })

    it("Finds the page title & subtitle", () => {
        cy.get('#title').should('be.visible')
        cy.get('#subtitle').should('be.visible')
    })

    it("Finds the create recommendation button", () => {
        cy.wait(500)
        cy.get('#recBtn').should('be.visible')
        cy.wait(500)
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