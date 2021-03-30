describe("Side Menu", () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it("Finds all list elements", () => {
        cy.get('.MuiAvatar-root').should('exist') // avatar
        cy.get(':nth-child(1) > .MuiListItem-root > .MuiListItemText-root > .MuiListItemText-primary').should('exist') // avatar and user container
        cy.get(':nth-child(1) > .MuiListItem-root > .MuiListItemText-root > .MuiListItemText-primary').should('exist') // user
        cy.get('#jobPosition').should('exist') // role

        cy.get(':nth-child(2) > [data-testid=listitemDashboard]').should('exist') // dashboard
        cy.get('[data-testid=listitemRecommendations]').should('exist') //  recommendations
        cy.get('.logo > svg').should('exist') // logo
    })

    it("Clicks on Recommendations", () => {
        cy.get(':nth-child(3) > [data-testid=listitemRecommendations]').click() // Recommendations
    })

    it("Clicks on all nested options", () => {
        // Step 1: Click on Recommendations: no need to do that in this case since it is open at
        // first render

        // Step 2: Click on nested elements
        cy.get('[data-testid=listitemManage]').click() // Manage
        cy.get('[data-testid=listitemJobs]').click() // Jobs
        cy.get('[data-testid=listitemResults]').click() // Results
    })

    it("Scenario where the user clicks on Recommendations and then chooses to view Results", () => {
        // Step 1: Click on Recommendations
        // cy.get('[data-testid=listitemRecommendations] > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()

        // Step 2: Click on Results
        cy.get('[data-testid=listitemResults]').click()

    })
})