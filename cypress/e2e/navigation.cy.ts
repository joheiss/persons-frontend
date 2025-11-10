describe('App Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home page by default', () => {
    cy.url().should('include', '/home');
    cy.contains('h1', 'Welcome to the Persons App').should('be.visible');
  });

  it('should navigate to persons list', () => {
    cy.navigateToMenu('Persons');
    cy.url().should('include', '/persons');
    cy.get('app-person-list').should('exist');
  });

  it('should navigate to requests list', () => {
    cy.navigateToMenu('Requests');
    cy.url().should('include', '/requests');
    cy.get('app-requests-list').should('exist');
  });

  it('should navigate to add person form', () => {
    cy.navigateToMenu('Persons');
    cy.contains('button', 'Add Person').click();
    cy.url().should('include', '/persons/add');
    cy.get('app-person-add').should('exist');
  });

  it('should navigate back to home', () => {
    cy.navigateToMenu('Persons');
    cy.navigateToMenu('Home');
    cy.url().should('include', '/home');
    cy.contains('h1', 'Welcome to the Persons App').should('be.visible');
  });
});
