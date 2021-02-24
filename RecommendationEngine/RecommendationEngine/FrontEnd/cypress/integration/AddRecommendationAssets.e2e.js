

describe('Add Recommendation with asssets at various level', () => {

    beforeEach(() => {
        cy.visit('/recommendations-manage');
        cy.get('#rec-btn').click();
    })

    it('Dialog is displayed.', () => {
        cy.get('[data-testid=dialog]').should('exist');
    });

    it('it presses on the next button.', () => {
        cy.get('#next-btn > .MuiButton-label').click();
        cy.get('#details-configuration-modal > :nth-child(1) > :nth-child(1)').should('exist');
    });

    //TODO: The jobs are not created because we should set the date to a minute in the future. Or simply force run the addRec.
    it('Select one portfolio type and some asset types in Basic Configuration context and check if jobs are added and running', () => {
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
        cy.wait(1500);
        cy.visit('/recommendations-jobs');
        cy.wait(1000);
        cy.get('[data-field="timestamp"] > .MuiDataGrid-colCell-draggable > .MuiDataGrid-colCellTitleContainer > .MuiDataGrid-colCellTitle').click();
        cy.get('.MuiDataGrid-iconButtonContainer > div > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
        cy.wait(500);
        cy.contains('Hellow World System test').should('exist');
    });
       
});
