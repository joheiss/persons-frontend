describe('Person Add and Edit', () => {
  const testPerson = {
    name: 'Test',
    dateOfBirth: '1990-11-27',
    score: 123,
    salary: 4321.98,
    active: true,
    comment: 'Test comment',
  };

  describe('Add Person', () => {
    beforeEach(() => {
      cy.visit('/persons');
      cy.get('button[data-cy="button-add"]').click();
    });

    it('should display the add person form', () => {
      cy.get('app-person-add').should('exist');
      cy.get('form').should('exist');
      cy.get('input[data-cy="input-name"]').should('exist');
      cy.get('input[data-cy="input-dateOfBirth"]').should('exist');
      cy.get('input[data-cy="input-score"]').should('exist');
      cy.get('input[data-cy="input-salary"]').should('exist');
      cy.get('input[data-cy="input-active"]').should('exist');
      cy.get('textarea[data-cy="input-comment"]').should('exist');
    });

    it.skip('should validate required fields', () => {
      cy.get('button[data-cy="button-save"]').click();
      cy.get('form').should('contain', 'Name is required');
      cy.get('form').should('contain', 'Date of birth is required');
      cy.get('form').should('contain', 'Score is required');
    });

    it('should successfully add a new person', () => {
      cy.get('input[data-cy="input-name"]').type(testPerson.name);
      cy.get('input[data-cy="input-dateOfBirth"]').type(testPerson.dateOfBirth);
      cy.get('input[data-cy="input-score"]').type(testPerson.score.toString());
      cy.get('input[data-cy="input-salary"]').type(
        testPerson.salary.toString()
      );
      // Active field is disabled, so no need to type
      cy.get('textarea[data-cy="input-comment"]').type(testPerson.comment);
      cy.get('button[data-cy="button-save"]').click();

      cy.waitForToast('Your request is being processed');
      cy.url().should('include', '/persons');
    });
  });

  describe('Edit Person', () => {
    beforeEach(() => {
      cy.visit('/persons');
      cy.get('table tbody tr')
        .first()
        .find('button[data-cy="button-edit"]')
        .click();
    });

    it('should display the edit person form with populated data', () => {
      cy.get('app-person-edit').should('exist');
      cy.get('form').should('exist');
      cy.get('input[data-cy="input-name"]')
        .invoke('val')
        .should('not.be.empty');
      cy.get('input[data-cy="input-dateOfBirth"]')
        .invoke('val')
        .should('not.be.empty');
      cy.get('input[data-cy="input-score"]')
        .invoke('val')
        .should('not.be.empty');
      cy.get('input[data-cy="input-salary"]')
        .invoke('val')
        .should('not.be.empty');
    });

    it('should successfully edit a person', () => {
      const comment = 'This is an edited comment';
      cy.get('textarea[data-cy="input-comment"]').clear().type(comment);
      cy.get('button[data-cy="button-save"]').click();

      cy.waitForToast('Your change request is being processed');
      cy.url().should('match', /\/persons$/);
      cy.contains(comment).should('exist');
    });

    it('should cancel edit and return to detail view', () => {
      cy.get('button[data-cy="button-cancel"]').click();
      cy.url().should('match', /\/persons$/);
      cy.get('app-person-list').should('exist');
    });
  });
});
