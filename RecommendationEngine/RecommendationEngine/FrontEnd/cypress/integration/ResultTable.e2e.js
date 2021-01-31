describe("Result Page", () => {

    beforeEach(() => {
        cy.visit('/recommendations-results')
    })

    it("Finds the page title & subtitle", () => {
        cy.get('#title').should('be.visible')
        cy.get('#subtitle').should('be.visible')
    })

    it("Finds the searchbar", () => {
        cy.wait(1000)
        cy.get('#data-testid').should('be.visible')
    })

    it("Search bar can take queries", () => {
        cy.wait(500)
        cy.get("#data-testid").click()
        cy.get("#data-testid").type("183")
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


    it("Checks if the action list drawer opens", () => {
        cy.get(':nth-child(1) > .primaryKey').click()
        cy.wait(500)
    })

    it("Finds all elements in the action list drawer", () => {
        cy.get(':nth-child(1) > .primaryKey').click()
        cy.wait(500)
        cy.get('#react-tabs-0').should('exist')
        cy.wait(500)
        cy.wait(500)
        cy.get('#react-tabs-0 > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').should('exist')
        cy.wait(500)
        cy.get('#info-container').should('exist')
        cy.wait(500)
        cy.get('#info-container > :nth-child(1)').should('exist')
        cy.wait(500)
        cy.get('#info-container > :nth-child(2)').should('exist')
        cy.wait(500)
        cy.get('#info-container > :nth-child(3)').should('exist')
        cy.wait(500)
        cy.get('#asset-names').should('exist')
        cy.wait(500)
        cy.get('#actions-title').should('exist')
        cy.wait(500)
        cy.get('#actions-title').should('exist')
        cy.wait(500)
        cy.get('#action-title').should('exist')
        cy.wait(500)
        cy.get('#display-text-container').should('exist')
        cy.wait(500)
        cy.get('#suggestion-date').should('exist')
        cy.wait(500)
        cy.get('#num-actions > p').should('exist')
        cy.wait(500)
        cy.get('#num-actions').should('exist')

    })

    it("Checks if the action list drawer closes", () => {
        cy.get(':nth-child(1) > .primaryKey').click()
        cy.wait(500)
        cy.get('#react-tabs-0 > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
        cy.wait(500)
    })
})