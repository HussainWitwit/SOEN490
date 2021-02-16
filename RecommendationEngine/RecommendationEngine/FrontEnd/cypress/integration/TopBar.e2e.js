
describe('TopBar component', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("It finds the top bar", () => {
        cy.wait(500)
        cy.get('nav').should('exist')
    })

    it("Expects all top-bar elements to be visible", () => {
        cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('exist') //done
        cy.wait(500)
        cy.get('.MuiBreadcrumbs-ol > :nth-child(2)').should('exist') // done
        cy.wait(500)
        cy.get(':nth-child(3) > .MuiTypography-root > svg > path').should('exist') // done
        cy.wait(500)
        cy.get(':nth-child(3) > .MuiTypography-root').should('exist') // done
        cy.wait(500)
        cy.get(':nth-child(5) > .MuiTypography-root').should('exist') // done
        cy.wait(500)
        cy.get('#change-button').should('exist')
        cy.wait(500)
        cy.get('#change-button').click()
        cy.wait(500)
        cy.get('#img').should('exist')
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
