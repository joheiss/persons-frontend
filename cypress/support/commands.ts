declare namespace Cypress {
  interface Chainable {
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    navigateToMenu(menuItem: string): Chainable<void>;
    waitForToast(message: string): Chainable<void>;
  }
}

// Get element by data-testid attribute
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Navigate using menu items
Cypress.Commands.add('navigateToMenu', (menuItem: string) => {
  cy.get('nav').contains(menuItem).click();
});

// Wait for toast notification with specific message
Cypress.Commands.add('waitForToast', (message: string) => {
  cy.get('app-toast').contains(message).should('be.visible');
});
