describe('save Page', () => {
  beforeEach(() => {
    cy.intercept(
      'POST',
      'https://packmate-be-d3fb267b5fee.herokuapp.com/graphql',
      {
        body: {
          data: {
            items: [
              { id: '1', name: 'Tent' },
              { id: '2', name: 'Sleeping Bag' },
              { id: '3', name: 'Camp Stove' },
            ]
          }
        }
      }
    )
      .as("fetchItems")

    cy.visit("localhost:3000")
    cy.contains('Select a Trip').should('be.visible')
    cy.get(".trip-dropdown").select('Camping')
    cy.get(".trip-submit").click()
    cy.wait("@fetchItems")
    cy.contains('Tent');
    cy.contains('Sleeping Bag');
    cy.contains('Camp Stove');
    cy.get('input[type="text"]').first().type("list 1");
    cy.get('input[type="checkbox"]').first().check();
    cy.get(".submit-list-button").click()
    cy.url().should('include', '/mylist');
  });
  
  it('should display "My List" over the  saved list', () => {
    cy.contains("My List");
  });

  it('should display saved list', () => {
  cy.get('.list-name-buttons')
    .should('have.text', 'list 1')
    .click();
  cy.contains('Tent');
});

it('should allow user to click on list to view saved list items', () => {
  cy.get('.list-name-buttons')
    .should('have.text', 'list 1')
    .click();
  cy.contains('Tent');
});

  it('should display selected items from ListPage', () => {
    cy.get('.list-name-buttons').click();
    cy.contains('Tent')
  });

  it('should display ready message when all items are packed', () => {
    cy.get('.list-name-buttons').click();
    cy.contains('Tent')
      .find('.checkbox')
      .should('be.visible')
      .click();
      cy.wait(500);
      cy.contains('You\'re ready for your trip!!').should('be.visible');
  });
});
