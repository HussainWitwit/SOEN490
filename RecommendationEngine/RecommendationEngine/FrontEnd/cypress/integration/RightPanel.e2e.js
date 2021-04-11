
describe("RightPanel component", () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("Finds all elements", () => {
        cy.get('#change-button').click()
        cy.wait(500)
        cy.get('.MuiTreeView-root').should('exist')
        cy.wait(500)
        cy.get(':nth-child(3) > .MuiDrawer-root > .MuiPaper-root').should('exist')
        cy.wait(500)
    })

    it("Clicks  on all elements", () => {
        cy.get('#change-button').click() // change button
        cy.wait(500)
    })
})