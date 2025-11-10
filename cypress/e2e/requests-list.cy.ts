describe('Requests List', () => {
  beforeEach(() => {
    cy.visit('/requests');
  });

  it('should display the requests list', () => {
    cy.get('app-requests-list').should('exist');
    cy.get('table').should('exist');
  });

  it('should show request details in the list', () => {
    cy.get('table thead').within(() => {
      cy.contains('th', 'Type').should('exist');
      cy.contains('th', 'Status').should('exist');
      cy.contains('th', 'Created').should('exist');
      cy.contains('th', 'Modified').should('exist');
    });
  });

  it('should allow filtering requests', () => {
    // Test status filter if available
    cy.get('select').should('exist');
    cy.get('select').select('COMPLETED');
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).should('contain', 'COMPLETED');
    });
  });

  it('should update requests list periodically', () => {
    // Check if the list updates periodically (if implemented)
    cy.get('table tbody tr').then(($rows) => {
      const initialCount = $rows.length;
      // Wait for potential updates
      cy.wait(5000);
      cy.get('table tbody tr').should('have.length', initialCount);
    });
  });

  it('should display appropriate message when no requests exist', () => {
    // This test assumes there's a way to clear requests or filter to empty state
    cy.get('select').select('REJECTED'); // Assuming this might result in no items
    cy.get('table tbody tr').should('have.length', 0);
    cy.contains('No requests found').should('be.visible');
  });
});
