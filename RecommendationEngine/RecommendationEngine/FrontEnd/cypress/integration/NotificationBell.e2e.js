
describe("Notification Bell", () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it("Finds the notification bell", () => {
        cy.get('.icon > .image').should('exist')
    })

    it("Finds the notification data", () => {
        cy.wait(500)
        cy.get('.icon > .image').should('exist')
        cy.wait(500)
        cy.get('.items > :nth-child(1)').should('exist')
    })

    it("Clicks on the notification bell", () => {
        cy.wait(500)
        cy.get('.icon > .image').click()
    })

    it("Clicks on the notification bell and click on view all", () => {
        cy.get('.icon > .image').click()
        cy.wait(1000)
        cy.get('.header-option')
        cy.wait(500)
        cy.get('.icon > .image').click()
    })
})