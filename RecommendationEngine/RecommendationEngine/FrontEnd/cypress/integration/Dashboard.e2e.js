describe("Result Page", () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it("Finds the potential savings widget", () => {
        cy.get('.net-savings').should('be.visible')
    })

    it("Finds the average roi widget", () => {
        cy.get('.roi').should('be.visible')
    })

    it("Finds the potential losses widget", () => {
        cy.get('.inaction').should('be.visible')
    })

    it("Finds the empty list of actions", () => {
        cy.get('#actions-unavailable').should('be.visible')
    })

    it("Finds the calendar previous button", () => {
        cy.get('.fc-prev-button').should('be.visible')
    })

    it("Finds the calendar next button", () => {
        cy.get('.fc-next-button').should('be.visible')
    })

    it("Checks if the calendar grid gets highlighted when clicked on", () => {
        cy.get(':nth-child(1) > .fc-day-thu > .fc-daygrid-day-frame').click()
        cy.get('.fc-highlight').should('be.visible')

    })
})