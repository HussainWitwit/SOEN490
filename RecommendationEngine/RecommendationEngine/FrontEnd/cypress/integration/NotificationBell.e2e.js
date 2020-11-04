
describe("Notification Bell", () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it("Finds the notification bell", () => {
        cy.get('[d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"]').should('exist')
    })

    it("Finds the notification data", () => {
        cy.wait(500)
        cy.get('.notification').should('exist')
        cy.wait(500)
    })

    it("Clicks on the notification bell", () => {
        cy.wait(500)
        cy.get('.notification').click()
    })

    it("Clicks on the notification bell and marks all as read", () => {
        cy.get('.notification').click()
        cy.wait(1000)
        cy.get('.popover-body > :nth-child(1) > .btn').click()
        cy.wait(500)
        cy.get('.notification').click()
    })
})