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
        cy.get("#data-testid").type("178")
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
    
    it('Sorts by jobid', () => {
        cy.get(':nth-child(2) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(2) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })

    it('Sorts by status', () => {
        cy.get('.custom-status-header').should('exist')
        cy.wait(500)
        cy.get('.custom-status-header').click()
        cy.wait(500)
    })

    it('Sorts by timestamp', () => {
        cy.get(':nth-child(4) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(4) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })
    
    it('Sorts by job duration', () => {
        cy.get(':nth-child(5) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(5) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })

    it('Sorts by configured recommendation', () => {
        cy.get(':nth-child(6) > #table-header').should('exist')
        cy.wait(500)
        cy.get(':nth-child(6) > #table-header').click({ force: true })
        cy.wait(500)
        cy.get('[aria-sort="ascending"] > #table-header').click()
        cy.wait(500)
    })
})

// describe("Job Log Popup", () => {

//     beforeEach(() => {
//         cy.visit('/recommendations-jobs')
//         cy.get(':nth-child(1) > :nth-child(7) > div > .MuiButtonBase-root > .MuiButton-label > .MuiSvgIcon-root > path').click()
//     })

//     it("Finds the popup", () => {
//         cy.wait(500)
//         cy.get('.MuiDialog-container').should('be.visible')

//     })

//     it("Finds the dialog title", () => {
//         cy.wait(500)
//         cy.get('.MuiDialog-container').should('be.visible')
//         cy.wait(500)
//         cy.get('#scroll-dialog-title > .MuiTypography-root').should('be.visible')

//     })

//     it("Finds the log table", () => {
//         cy.get('.MuiDialogContent-root')
//         cy.wait(500)
//         cy.get('.MuiDialogContent-root > #root > #paper > .MuiTableContainer-root > #table > #table-head > #table-row > :nth-child(2)').should('be.visible')
//         cy.wait(500)
//         cy.get('.MuiDialogContent-root > #root > #paper > .MuiTableContainer-root > #table > #table-head > #table-row > :nth-child(3)').should('be.visible')
//         cy.wait(500)
//         cy.get('.MuiDialogContent-root > #root > #paper > .MuiTableContainer-root > #table > #table-head > #table-row > :nth-child(4)').should('be.visible')
//         cy.wait(500)
//         cy.get('.MuiDialogContent-root > #root > #paper > .MuiTableContainer-root > #table > #table-head > #table-row > :nth-child(5)').should('be.visible')
//     })
// })
