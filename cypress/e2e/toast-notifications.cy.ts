describe('Toast Notifications', () => {
  it('should show success toast when adding a person', () => {
    cy.visit('/persons/add');
    cy.get('input[formControlName="firstName"]').type('Toast');
    cy.get('input[formControlName="lastName"]').type('Test');
    cy.get('input[formControlName="email"]').type('toast.test@example.com');
    cy.contains('button', 'Save').click();

    cy.waitForToast('Person saved successfully');
  });

  it('should show success toast when updating a person', () => {
    cy.visit('/persons');
    cy.get('table tbody tr').first().click();
    cy.contains('button', 'Edit').click();

    cy.get('input[formControlName="email"]')
      .clear()
      .type('updated.toast@example.com');

    cy.contains('button', 'Save').click();
    cy.waitForToast('Person updated successfully');
  });

  it('should show error toast when form validation fails', () => {
    cy.visit('/persons/add');
    cy.get('input[formControlName="email"]').type('invalid-email');
    cy.contains('button', 'Save').click();

    cy.get('app-toast').should('contain', 'Please fix the form errors');
  });

  it('should show error toast when server request fails', () => {
    // Force a server error by attempting to create a person with invalid data
    cy.visit('/persons/add');
    cy.window().then((win) => {
      cy.stub(win.console, 'error').as('consoleError');
    });

    cy.get('input[formControlName="firstName"]').type('Test');
    cy.get('input[formControlName="lastName"]').type('Error');
    cy.get('input[formControlName="email"]').type('test.error@example.com');

    // Intercept the POST request and force it to fail
    cy.intercept('POST', '**/persons', {
      statusCode: 500,
      body: { message: 'Server error' },
    }).as('createPerson');

    cy.contains('button', 'Save').click();
    cy.wait('@createPerson');

    cy.get('app-toast').should('contain', 'Error saving person');
  });

  it('should automatically hide toast after timeout', () => {
    cy.visit('/persons/add');
    cy.get('input[formControlName="firstName"]').type('Toast');
    cy.get('input[formControlName="lastName"]').type('Timeout');
    cy.get('input[formControlName="email"]').type('toast.timeout@example.com');
    cy.contains('button', 'Save').click();

    cy.waitForToast('Person saved successfully');
    cy.get('app-toast').should('be.visible');

    // Wait for toast to disappear (assuming 3s timeout)
    cy.wait(3000);
    cy.get('app-toast').should('not.exist');
  });
});
