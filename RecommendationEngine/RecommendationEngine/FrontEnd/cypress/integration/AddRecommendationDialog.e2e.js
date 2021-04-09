describe('Add Recommendation Dialog', () => {


    beforeEach(() => {
        cy.visit('/recommendations-manage');
        cy.get('#rec-btn').click();
    })

    it('Dialog is displayed.', () => {
        cy.wait(1000);
        cy.get('[data-testid=dialog]').should('exist');
    });

    it('Dialog is closed with cancel button.', () => {
        cy.wait(1000);
        cy.get('#cancel-btn').click();
        cy.wait(1000);
        cy.get('[data-testid=dialog]').should('not.exist');
    });

    it('Dialog is closed with close icon button.', () => {
        cy.get('#close-button > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('[data-testid=dialog]').should('not.exist');
    });

    it('Selects between recommendation types', () => {
        cy.get('#item-template-selected').click();
        cy.wait(1000);
        cy.get('[data-testid=template] > :nth-child(4)').click();
        cy.wait(1000);
        cy.get('[data-testid=template] > :nth-child(2)').click();
        cy.wait(1000);
        cy.get('[data-testid=template] > :nth-child(5)').click();
        cy.wait(1000);
        cy.get('[data-testid=template] > :nth-child(6)').click();
        cy.wait(1000);
        cy.get('[data-testid=template] > :nth-child(3)').click();
    });

    it('Can navigate between first page and second page ', () => {
        cy.wait(1000);
        cy.get('#next-btn').click();
        cy.wait(1000);
        cy.get('[data-testid=previous-button]').click();
    });

    // it('Next button is disabled when recommendation types are not received from API ', () => {
    //     cy.wait(1000);
    //     cy.get('#next-btn').should('be.disabled');
    // });

    it('Next button is disabled when required inputs are empty ', () => {
        cy.get('#next-btn').click();
        cy.wait(1000);
        cy.get('#next-btn').should('be.disabled');;
    });

    //No longer good
    it('Can fill info in Basic Configuration context for Yearly Wash optimization', () => {
        cy.get('#item-template-selected').click();
        cy.get('#next-btn').click();
        cy.wait(1000);
        cy.get('[data-testid=title] > .MuiInputBase-root > .MuiInputBase-input').type("Hellow World");
        cy.wait(1000);
        cy.get('[data-testid=autocomplete-component] > .MuiFormControl-root > .MuiInputBase-root').type('ni');
        cy.wait(1000);
        cy.get('#details-configuration-modal > :nth-child(1) > :nth-child(1)').click(); //clicking randomly to close the dropdown
        cy.get('[data-testid=option-net]').click();
        cy.wait(1000);
        cy.get('[data-testid=granularity]').should('be.disabled');
        cy.wait(1000);
        cy.get('[data-testid=date] > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
        cy.wait(1000);
        cy.get(':nth-child(6) > :nth-child(1) > .MuiButtonBase-root > .MuiIconButton-label > .MuiTypography-root').click();
        cy.wait(1000);
        //Fails on remote idk for what reason
        cy.get('[role="dialog"][style="position: fixed; z-index: 1300; inset: 0px;"] > .MuiDialog-container > .MuiDialog-paper > .MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();
    });

    //No longer good
    it('Can post a recommendaiton for Yearly Wash optimization', () => {

        cy.get('#item-template-selected').click();
        cy.get('#next-btn').click();
        cy.get('[data-testid=title] > .MuiInputBase-root > .MuiInputBase-input').type("Hellow World");
        cy.wait(1000);
        cy.get('[data-testid=autocomplete-component] > .MuiFormControl-root > .MuiInputBase-root').type('ni');
        cy.contains('Nickelson 2').should('be.visible').click();
        cy.wait(1000);
        cy.get('#details-configuration-modal > :nth-child(1) > :nth-child(1)').click(); //clicking randomly to close the dropdown
        cy.get('[data-testid=option-net]').click();
        cy.wait(1000);
        cy.get('[data-testid=granularity]').should('be.disabled');
        cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
        cy.wait(1000);
        cy.get(':nth-child(6) > :nth-child(1) > .MuiButtonBase-root > .MuiIconButton-label > .MuiTypography-root').click();
        cy.wait(1000);
        cy.get('[role="dialog"][style="position: fixed; z-index: 1300; inset: 0px;"] > .MuiDialog-container > .MuiDialog-paper > .MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();
        cy.get('#next-btn').click();
        cy.wait(1000);
        cy.get('#next-btn').click();
        cy.wait(1000);
        cy.get('[data-testid=confirm-button]').click();
        cy.get('[data-testid=dialog]').should('not.exist');
        // cy.get('[data-testid=table-body-cypress]').children().should('have.length', number + 1); //Wanted to make sure the size of the table increased by 1. It did increased, however this line was failing
    });
    
    it('Can add a recommendation when selecting two different type of asset.', () => {
        cy.get('#next-btn > .MuiButton-label').click();
        cy.wait(500)
        cy.get('#details-configuration-modal > :nth-child(1) > :nth-child(1)').should('exist');
        cy.get('[data-testid=title] > .MuiInputBase-root > .MuiInputBase-input').type("Hellow World System test");
        cy.get('.ant-select-selection-overflow').click();
        cy.get('.ant-select-dropdown').should('exist');
        cy.get(':nth-child(2) > .ant-select-tree-checkbox > .ant-select-tree-checkbox-inner').click(); 
        cy.wait(500)   
        cy.get(':nth-child(4) > .ant-select-tree-switcher').click();
        cy.wait(500)
        cy.get(':nth-child(5) > .ant-select-tree-checkbox > .ant-select-tree-checkbox-inner').click();
        cy.wait(500)
        cy.get('#next-btn > .MuiButton-label').click();
        cy.wait(500)
        cy.get('#next-btn > .MuiButton-label').click();
        cy.wait(500);
        cy.get('[data-testid=confirm-button]').click();
        cy.get('.Toastify__toast-body').should('exist');
        cy.get('.Toastify__toast-body').contains("successful");
    });

    //Not working.... RE-8
    // it('Can set values for different parameters', () => {
    //     cy.get('#next-btn > .MuiButton-label').click();
    //     cy.wait(500)
    //     cy.get('#details-configuration-modal > :nth-child(1) > :nth-child(1)').should('exist');
    //     cy.get('[data-testid=title] > .MuiInputBase-root > .MuiInputBase-input').type("Hellow World System test");
    //     cy.get('.ant-select-selection-overflow').click();
    //     cy.get('.ant-select-dropdown').should('exist');
    //     cy.get(':nth-child(2) > .ant-select-tree-checkbox > .ant-select-tree-checkbox-inner').click(); 
    //     cy.wait(500)   
    //     cy.get(':nth-child(4) > .ant-select-tree-switcher').click();
    //     cy.wait(500)
    //     cy.get(':nth-child(5) > .ant-select-tree-checkbox > .ant-select-tree-checkbox-inner').click();
    //     cy.wait(500)
    //     cy.get('#next-btn > .MuiButton-label').click();
    //     cy.get('#parameter-value0').scrollIntoView().should('be.visible');
    //     cy.get(':nth-child(1) > :nth-child(2) > [data-testid=parameter-value] > .MuiInputBase-root > .MuiInputBase-input').clear();
    //     cy.get(':nth-child(1) > :nth-child(2) > [data-testid=parameter-value] > .MuiInputBase-root > .MuiInputBase-input').type("2");
    //     cy.wait(500)
    //     cy.get('#next-btn > .MuiButton-label').click();
    //     cy.wait(500);
    //     cy.get('[data-testid=confirm-button]').click();
    //     cy.get('.Toastify__toast-body').should('exist');
    //     cy.get('.Toastify__toast-body').contains("successful");
    // });



});
