describe('Person Add and Edit', () => {
  const testPerson = {
    firstName: 'Test',
    lastName: 'Person',
    email: 'test.person@example.com',
  };

  describe('Add Person', () => {
    beforeEach(() => {
      cy.visit('/persons/add');
    });

    it('should display the add person form', () => {
      cy.get('app-person-add').should('exist');
      cy.get('form').should('exist');
      cy.get('input[formControlName="firstName"]').should('exist');
      cy.get('input[formControlName="lastName"]').should('exist');
      cy.get('input[formControlName="email"]').should('exist');
    });

    it('should validate required fields', () => {
      cy.contains('button', 'Save').click();
      cy.get('form').should('contain', 'First name is required');
      cy.get('form').should('contain', 'Last name is required');
      cy.get('form').should('contain', 'Email is required');
    });

    it('should validate email format', () => {
      cy.get('input[formControlName="email"]').type('invalid-email');
      cy.get('form').should('contain', 'Please enter a valid email');
    });

    it('should successfully add a new person', () => {
      cy.get('input[formControlName="firstName"]').type(testPerson.firstName);
      cy.get('input[formControlName="lastName"]').type(testPerson.lastName);
      cy.get('input[formControlName="email"]').type(testPerson.email);
      cy.contains('button', 'Save').click();

      cy.waitForToast('Person saved successfully');
      cy.url().should('include', '/persons');
    });
  });

  describe('Edit Person', () => {
    beforeEach(() => {
      cy.visit('/persons');
      cy.get('table tbody tr').first().click();
      cy.contains('button', 'Edit').click();
    });

    it('should display the edit person form with populated data', () => {
      cy.get('app-person-edit').should('exist');
      cy.get('form').should('exist');
      cy.get('input[formControlName="firstName"]').should(
        'have.value.not.empty'
      );
      cy.get('input[formControlName="lastName"]').should(
        'have.value.not.empty'
      );
      cy.get('input[formControlName="email"]').should('have.value.not.empty');
    });

    it('should successfully edit a person', () => {
      const editedEmail = 'edited.email@example.com';

      cy.get('input[formControlName="email"]').clear().type(editedEmail);

      cy.contains('button', 'Save').click();

      cy.waitForToast('Person updated successfully');
      cy.url().should('match', /\/persons\/\d+$/);
      cy.contains(editedEmail).should('exist');
    });

    it('should cancel edit and return to detail view', () => {
      cy.contains('button', 'Cancel').click();
      cy.url().should('match', /\/persons\/\d+$/);
      cy.get('app-person-detail').should('exist');
    });
  });
});
