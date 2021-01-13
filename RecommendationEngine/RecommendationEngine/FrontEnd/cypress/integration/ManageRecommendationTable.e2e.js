
describe("Manage Recommendation Table", () => {

    beforeEach(() => {
        cy.visit('/recommendations/manage')
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
        cy.get('#custom-css-standard-input').should('be.visible')
    })

    it("Finds the filter button", () => {
        cy.get('#filterBtn > .MuiButton-label').should('be.visible')
    })

    it('Finds the table', () => {
        cy.get('#toolbar').should('exist')
        cy.get('#tableTitle').should('be.visible')
        cy.get('#custom-css-standard-input').should('be.visible')
        cy.get('#table-row > :nth-child(2)').should('be.visible')
        cy.get('#table-row > :nth-child(3)').should('be.visible')
        cy.get('#table-row > :nth-child(4)').should('be.visible')
        cy.get('#pagination > .MuiToolbar-root').should('be.visible')
        cy.get('.MuiTablePagination-actions').should('be.visible')
    })
})