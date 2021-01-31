describe("Job Page", () => {

    beforeEach(() => {
        cy.visit('/recommendations-jobs')
    })

    it("Finds the page title & subtitle", () => {
        cy.wait(1000)
        cy.get('#title').should('be.visible')
        cy.wait(1000)
        cy.get('#subtitle').should('be.visible')
    })

    it("Finds the searchbar", () => {
        cy.wait(1000)
        cy.get('#data-testid').should('be.visible')
    })

    it("Search bar can take queries", () => {
        cy.wait(500)
        cy.get("#data-testid").click()
        cy.get("#data-testid").type("Recommendation 23")
        cy.get('#data-testid').should('be.visible')
        cy.wait(500)
    })


    it("Finds the filter button", () => {
        cy.wait(1000)
        cy.get('#filterBtn > .MuiButton-label').should('be.visible')
    })

    it('Finds the table', () => {
        cy.get('#toolbar').should('exist')
        cy.get('[data-testid=tableTitle]').should('be.visible')
        cy.get('#data-testid').should('be.visible')
        cy.get('#table-row > :nth-child(2)').should('be.visible')
        cy.get('#table-row > :nth-child(3)').should('be.visible')
        cy.get('#table-row > :nth-child(4)').should('be.visible')
        cy.get('#pagination > .MuiToolbar-root').should('be.visible')
        cy.get('.MuiTablePagination-actions').should('be.visible')
    })
})