describe("It can click on the menu items", () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it("Finds all list elements", () => {
        cy.get('.MuiAvatar-root').should('exist') // avatar
        cy.get(':nth-child(1) > .MuiListItem-root > .MuiListItemText-root > .MuiListItemText-primary').should('exist') // avatar and user container
        cy.get(':nth-child(1) > .MuiListItem-root > .MuiListItemText-root > .MuiListItemText-primary').should('exist') // user
        cy.get('#jobPosition').should('exist') // role

        cy.get(':nth-child(1) > [data-testid=listitem1] > .MuiListItemText-root > .MuiTypography-root').should('exist') // dashboard
        cy.get('.MuiPaper-root > :nth-child(2) > :nth-child(2)').should('exist') //  recommendations
        cy.get('.MuiPaper-root > :nth-child(2) > :nth-child(3)').should('exist') // Work orders
        cy.get('.settings > p').should('exist')
        cy.get(':nth-child(4) > :nth-child(1)').should('exist') // Main Settings
        cy.get(':nth-child(4) > :nth-child(2)').should('exist') // Notifications
    })

    it("Clicks on Recommendations", () => {
        cy.get('.MuiPaper-root > :nth-child(2) > :nth-child(2)').click() // Recommendations
    })

    it("Clicks on all nested options", () => {
        // Step 1: Click on Recommendations
        cy.get('.MuiPaper-root > :nth-child(2) > :nth-child(2)').click().should('have.length', 1)

        // Step 2: Click on nested elements
        cy.get('.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1)').click() // Manage
        cy.get('.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(2)').click() // Results
        cy.get('.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(3)').click() // Jobs
        cy.get('.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(4)').click() // Actions
    })

    it("Clicks on Work Orders, Main Settings and Notifications", () => {
        cy.get('.MuiPaper-root > :nth-child(2) > :nth-child(3)') // Work Orders
        cy.get(':nth-child(5) > [data-testid=listitem1]').click() // Main Settings
        cy.get(':nth-child(6) > [data-testid=listitem1]').click() // Notifications

    })

    it("Scenario where the user clicks on Recommendations and then chooses to view Results", () => {
        // Step 1: Click on Recommendations
        cy.get('.MuiPaper-root > :nth-child(2) > :nth-child(2)').click()

        // Step 2: Click on Results
        cy.get('.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(2)').click()

    })
})