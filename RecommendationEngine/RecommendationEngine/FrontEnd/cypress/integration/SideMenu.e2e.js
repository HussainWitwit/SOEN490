describe("Side Menu", () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it("Finds all list elements", () => {
        cy.get('.MuiAvatar-root').should('exist') // avatar
        cy.get(':nth-child(1) > .MuiListItem-root > .MuiListItemText-root > .MuiListItemText-primary').should('exist') // avatar and user container
        cy.get(':nth-child(1) > .MuiListItem-root > .MuiListItemText-root > .MuiListItemText-primary').should('exist') // user
        cy.get('#jobPosition').should('exist') // role

        cy.get(':nth-child(2) > [data-testid=listitem1]').should('exist') // dashboard
        cy.get(':nth-child(2) > [data-testid=listitem1]').should('exist') //  recommendations
        cy.get(':nth-child(4) > [data-testid=listitem1]').should('exist') // Work orders
        cy.get('.settings > p').should('exist')
        cy.get(':nth-child(4) > :nth-child(1)').should('exist') // Main Settings
        cy.get(':nth-child(7) > [data-testid=listitem1]').should('exist') // Notifications
    })

    it("Clicks on Recommendations", () => {
        cy.get(':nth-child(3) > [data-testid=listitem1]').click() // Recommendations
    })

    it("Clicks on all nested options", () => {
        // Step 1: Click on Recommendations
        //Clicks on chevron down icon from Recommendation Option.
        cy.get('[data-testid=listitem1] > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()


        // Step 2: Click on nested elements
        cy.get('.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1)').click() // Manage
        cy.get('.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(2)').click() // Jobs
        cy.get('.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(3)').click() // Results
        cy.get('.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(4)').click() // Actions
    })

    it("Clicks on Work Orders, Main Settings and Notifications", () => {
        cy.get(':nth-child(4) > [data-testid=listitem1]').click() // Work Orders
        cy.get(':nth-child(6) > [data-testid=listitem1]').click() // Main Settings
        cy.get(':nth-child(6) > [data-testid=listitem1]').click() // Notifications

    })

    it("Scenario where the user clicks on Recommendations and then chooses to view Results", () => {
        // Step 1: Click on Recommendations
        cy.get('[data-testid=listitem1] > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()

        // Step 2: Click on Results
        cy.get('.MuiCollapse-wrapperInner > .MuiList-root > :nth-child(3)').click()

    })
})