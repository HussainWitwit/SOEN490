
describe('TopBar component', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("It finds the top bar", () => {
        cy.wait(500)
        cy.get('nav').should('exist')
    })

    it("Expects all top-bar elements to be visible", () => {
        cy.get('.breadcrumb > :nth-child(1) > svg').should('exist')
        cy.wait(500)
        cy.get(':nth-child(1) > .btn').should('exist')
        cy.wait(500)
        cy.get('.breadcrumb > :nth-child(2)').should('exist')
        cy.wait(500)
        cy.get('.breadcrumb > :nth-child(3)').should('exist')
        cy.wait(500)
        cy.get('.change_anchor').should('exist')
        cy.wait(500)
        cy.get('.icon > .image').click()
        cy.wait(500)
        cy.get('.temperature_icon').should('exist')
        cy.wait(500)
        cy.get('.weather > :nth-child(1)').should('exist')
        cy.wait(500)
        cy.get('.weather > :nth-child(2)').should('exist')
        cy.wait(500)
    })

    it("Clicks on the notification bell and click on view all", () => {
        cy.get('.icon > .image').click()
        cy.wait(1000)
        cy.get('.header-option')
        cy.wait(500)
        cy.get('.icon > .image').click()
    })
})