 
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
        cy.wait(1000)
        cy.get('#data-testid').should('be.visible')
    })

    it("Search bar can take queries", () => {
        cy.wait(500)
        cy.get("#data-testid").click()
        cy.get("#data-testid").type("Hellow World")
        cy.get('#data-testid').should('be.visible')
        cy.wait(500)
    })

    it("Finds the filter button", () => {
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

    it('Sorts by title', () => {
        cy.get(':nth-child(2) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(2) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })

    it('Sorts by type', () => {
        cy.get(':nth-child(3) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(3) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })

    it('Sorts by granularity', () => {
        cy.get(':nth-child(4) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(4) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })
    
    it('Sorts by created on', () => {
        cy.get(':nth-child(5) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(5) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })
})