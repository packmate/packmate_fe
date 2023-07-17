describe('List Page', () => {
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
  });

  it('should allow user to click "Camping" and be routed to a list page with camping items', () => {
    cy.contains('Select a Trip').should('be.visible')
    cy.get(".trip-dropdown").select('Camping')
    cy.get(".trip-submit").click()
    cy.wait("@fetchItems")
    cy.contains('Tent');
    cy.contains('Sleeping Bag');
    cy.contains('Camp Stove');
  });

  it('should display the header and when logo is clicked you should return to home page', () => {
    cy.get(".trip-dropdown").select('Camping')
    cy.get(".trip-submit").click()
    cy.wait("@fetchItems")
    cy.contains("PackMate")
    cy.get(".header").click()
    cy.visit("localhost:3000")
  })

  it('should display a Submit button and when clicked you should be routed to a saved list page', () => {
    cy.get(".trip-dropdown").select('Camping')
    cy.get(".trip-submit").click()
    cy.wait("@fetchItems")
    cy.contains("Submit")
    cy.get('input[type="text"]').first().type("My List");
    cy.get('input[type="checkbox"]').first().check();
    cy.get(".submit-list-button").click()
    cy.visit("localhost:3000/mylists")
  })

  it('should require you to enter a list name and select at least one item before you can hit submit', () => {
    cy.get(".trip-dropdown").select('Camping')
    cy.get(".trip-submit").click()
    cy.wait("@fetchItems")
    cy.get('input[type="text"]').first().type("My List")
    cy.get('.submit-list-button').should('be.disabled');
  })

  it('should clear all checked boxes if you navigate to different pages', () => {
    cy.get('.trip-dropdown').select('Camping');
    cy.get(".trip-submit").click()
    cy.wait('@fetchItems');
    cy.get('input[type="checkbox"]').first().check();
    cy.get('input[type="text"]').first().type("My List");
    cy.get('.submit-list-button').click();
    cy.wait(500);
    cy.go('back')
    cy.get('input[type="checkbox"]').should('not.be.checked');
  })

});

context('when the packing items API fails', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://packmate-be-d3fb267b5fee.herokuapp.com/graphql', {
      statusCode: 500
    }).as('items');

    cy.visit('localhost:3000');
  })
  it('should display an error page when the packing items fail to fetch', () => {
    cy.get(".trip-dropdown").select('Camping')
    cy.get(".trip-submit").click()
    cy.contains('Something went wrong')
  })

})
