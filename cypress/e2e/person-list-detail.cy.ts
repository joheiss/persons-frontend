describe('Person List and Detail', () => {
  beforeEach(() => {
    cy.visit('/persons');
  });

  it('should display the person list', () => {
    cy.get('app-person-list').should('exist');
    cy.get('table').should('exist');
    cy.get('tr').should('have.length.gt', 1); // Header row + at least one data row
  });

  it('should navigate to person detail when clicking on a person', () => {
    cy.get('table tbody tr').first().find("[data-cy='button-view']").click();
    cy.url().should('match', /\/persons\/\d+/);
    cy.get('app-person-detail').should('exist');
    cy.get('[data-cy="button-back"]').should('exist').click();
    cy.url().should('match', /\/persons$/);
  });

  it('should display person details correctly', () => {
    cy.get('table tbody tr').first().find("[data-cy='button-view']").click();
    cy.get('app-person-detail').within(() => {
      cy.contains('Name:').should('exist');
      cy.contains('Date of Birth:').should('exist');
      cy.contains('Salary:').should('exist');
    });
  });

  it('should have functional navigation buttons in edit view', () => {
    cy.get('table tbody tr').first().find("[data-cy='button-edit']").click();

    // Test Edit button
    cy.url().should('match', /\/persons\/\d+/);

    // Navigate back to detail
    // cy.go('back');

    // Test Back button
    cy.get("[data-cy='button-cancel']").click();
    cy.url().should('include', '/persons');
  });

  it('should have functional navigation buttons in detail view', () => {
    cy.get('table tbody tr').first().find("[data-cy='button-view']").click();

    // Test Edit button
    cy.url().should('match', /\/persons\/\d+/);

    // Navigate back to detail
    // cy.go('back');

    // Test Back button
    cy.get("[data-cy='button-back']").click();
    cy.url().should('include', '/persons');
  });
});
