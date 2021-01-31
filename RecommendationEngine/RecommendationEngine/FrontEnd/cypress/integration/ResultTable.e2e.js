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

    
    it('Sorts by result id', () => {
        cy.get(':nth-child(2) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(2) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })

    it('Sorts by net saving', () => {
        cy.get(':nth-child(3) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(3) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })

    it('Sorts by return on investment', () => {
        cy.get(':nth-child(4) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(4) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })
    
    it('Sorts by cost of action', () => {
        cy.get(':nth-child(5) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(5) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })

    it('Sorts by cost of inaction', () => {
        cy.get(':nth-child(6) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(6) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })
})