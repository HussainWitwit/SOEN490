
describe("RightPanel component", () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("Finds all elements", () => {
        cy.get('.breadcrumb > :nth-child(3) > .MuiButtonBase-root').click()
        cy.wait(500)
        cy.get('.drawer-header-container').should('exist')
        cy.wait(500)
        cy.get('.drawer-header-container > p').should('exist')
        cy.wait(500)
        cy.get('.material-icons').should('exist')
        cy.wait(500)
        cy.get('.drawer-header-container > :nth-child(3) > .MuiIconButton-label > .MuiSvgIcon-root').should('exist')
        cy.wait(500)
        cy.get('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').should('exist')
        cy.wait(500)
        cy.get('.MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').should('exist')
        cy.wait(500)
        cy.get('.MuiTreeView-root').should('exist')
        cy.wait(500)
        cy.get(':nth-child(2) > .MuiDrawer-root > .MuiPaper-root').should('exist')
        cy.wait(500)
    })

    it("Clicks  on all elements", () => {
        cy.get('.breadcrumb > :nth-child(3) > .MuiButtonBase-root').click() // change button
        cy.wait(500)
        cy.get('.material-icons').click() // pin
        cy.wait(500)
        cy.get('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('Asset Title 1') // automplete
        cy.wait(500)
        cy.get('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('{downArrow}') // scroll
        cy.wait(500)
        cy.get('.material-icons').click() //pin
        cy.wait(500)
        cy.get(':nth-child(3) > .MuiIconButton-label > .MuiSvgIcon-root > path').click() //close
        cy.wait(500)
    })
})