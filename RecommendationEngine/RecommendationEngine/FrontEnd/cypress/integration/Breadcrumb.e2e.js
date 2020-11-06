
describe("Breadcrumb component", () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("Finds all elements", () => {
        cy.get('.breadcrumb > :nth-child(1) > svg').should('exist')
        cy.wait(500)
        cy.get(':nth-child(1) > .btn').should('exist')
        cy.wait(500)
        cy.get('.breadcrumb > :nth-child(2)').should('exist')
        cy.wait(500)
        cy.get('.breadcrumb > :nth-child(3)').should('exist')
        cy.wait(500)
        cy.get(':nth-child(3) > .MuiButtonBase-root > .MuiButton-label').should('exist')
        cy.wait(500)
        cy.get('.icon > .image').should('exist')
        cy.wait(500)
        cy.get('.temperature_icon').should('exist')
        cy.wait(500)
        cy.get('.weather > :nth-child(1)').should('exist')
        cy.wait(500)
        cy.get('.weather > :nth-child(2)').should('exist')
        cy.wait(500)
    })

    it("Clicks  on all elements", () => {
        // cy.get('.breadcrumb > :nth-child(1) > svg').click()
        cy.get(':nth-child(1) > .btn').click()
        cy.wait(500)
        cy.get('.breadcrumb > :nth-child(2)').click()
        cy.wait(500)
        cy.get('.breadcrumb > :nth-child(3)').click()
        cy.wait(500)
        cy.get(':nth-child(3) > .MuiButtonBase-root > .MuiButton-label').click()
        cy.wait(500)
        cy.get('.icon > .image').click()
        cy.wait(500)
        cy.get('.temperature_icon').click()
        cy.wait(500)
        cy.get('.weather > :nth-child(1)').click()
        cy.wait(500)
        cy.get('.weather > :nth-child(2)').click()
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