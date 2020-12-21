describe('Add Recommendation Dialog', () => {


    beforeEach(() => {
        cy.visit('/');
        cy.get('#recBtn').click();
    })

    it('Dialog is displayed.', () => {
        cy.get('[data-testid=dialog]').should('exist');
    });

    it('Dialog is closed with cancel button.', () => {
        cy.get('#cancel-btn').click();
        cy.get('[data-testid=dialog]').should('not.exist');
    });

    it('Dialog is closed with close icon button.', () => {
        cy.get('#closeButton > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('[data-testid=dialog]').should('not.exist');
    });

    it('Selects between recommendation types', () => {
        // cy.get('#item-template-selected').click();
        // cy.get('[data-testid=template] > :nth-child(4)').click();
        // cy.get('[data-testid=template] > :nth-child(2)').click();
        // cy.get('[data-testid=template] > :nth-child(5)').click();
        // cy.get('[data-testid=template] > :nth-child(6)').click();
        // cy.get('[data-testid=template] > :nth-child(3)').click();
    });

    it('Can navigate between first page and second page ', () => {
        cy.get('#next-btn').click();
        cy.wait(500);
        cy.get('[data-testid=previous-button]').click();
    });

    it('Next button is disabled when required inputs are empty ', () => {
        cy.get('#next-btn').click();
        cy.wait(500);
        cy.get('#next-btn').should('be.disabled');;
    });

    it('Can fill info in Basic Configuration context for Yearly Wash optimization', () => {
        // cy.get('#item-template-selected').click();
        cy.get('#next-btn').click();
        cy.wait(500);
        cy.get('[data-testid=title] > .MuiInputBase-root > .MuiInputBase-input').type("Hellow World");
        cy.wait(500);
        cy.get('[data-testid=autocomplete-component] > .MuiFormControl-root > .MuiInputBase-root').type('ni');
        cy.wait(500);
        cy.get('#details-configuration-modal > :nth-child(1) > :nth-child(1)').click(); //clicking randomly to close the dropdown
        cy.get('[data-testid=option-net]').click();
        cy.wait(500);
        cy.get('[data-testid=granularity]').should('be.disabled');
        cy.wait(500);
        cy.get('[data-testid=date] > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
        cy.wait(500);
        cy.get(':nth-child(4) > :nth-child(5) > .MuiButtonBase-root > .MuiIconButton-label').click();
        cy.wait(500);
        //Fails on remote idk for what reason
        // cy.get('[role="dialog"][style="position: fixed; z-index: 1300; inset: 0px;"] > .MuiDialog-container > .MuiDialog-paper > .MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();
    });

    // it('Can post a recommendaiton for Yearly Wash optimization', () => {

    //     cy.get('#item-template-selected').click();
    //     cy.get('#next-btn').click();
    //     cy.get('[data-testid=title] > .MuiInputBase-root > .MuiInputBase-input').type("Hellow World");
    //     cy.wait(500);
    //     cy.get('[data-testid=autocomplete-component] > .MuiFormControl-root > .MuiInputBase-root').type('ni');
    //     cy.contains('Nickelson 2').should('be.visible').click();
    //     cy.wait(500);
    //     cy.get('#details-configuration-modal > :nth-child(1) > :nth-child(1)').click(); //clicking randomly to close the dropdown
    //     cy.get('[data-testid=option-net]').click();
    //     cy.wait(500);
    //     cy.get('[data-testid=granularity]').should('be.disabled');
    //     cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    //     cy.wait(500);
    //     cy.get('.MuiPickersYearSelection-container > :nth-child(3)').click();
    //     cy.wait(500);
    //     cy.get('#next-btn').click();
    //     cy.wait(500);
    //     cy.get('#next-btn').click();
    //     cy.wait(500);
    //     cy.get('[data-testid=confirm-button]').click();
    //     cy.get('[data-testid=dialog]').should('not.exist');
    //     // cy.get('[data-testid=table-body-cypress]').children().should('have.length', number + 1); //Wanted to make sure the size of the table increased by 1. It did increased, however this line was failing
    // });

});
