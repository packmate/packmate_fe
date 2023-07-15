describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('POST','https://packmate-be-d3fb267b5fee.herokuapp.com/graphql', {
      statusCode: 200,
      fixture: 'sampleData.json'
    })
    cy.visit("localhost:3000")
  });

  it.skip('should open up to the home page and user should see logo, app name, dropdown, submit and saved list btn', () => {
    cy.get('.logo').should('have.attr', 'alt', 'Packmate Logo of a suitcase')
    cy.get('.app-name').contains('PackMate')
    cy.get('.trip-dropdown').should('contain', 'Camping')
    cy.get('.trip-dropdown').should('contain', 'Kayaking')
    cy.get('.trip-dropdown').should('contain', 'Fishing')
    cy.get('.trip-dropdown').should('contain', 'Climbing')
    cy.get('.trip-dropdown').should('contain', 'Mountain Biking')
    cy.get('.trip-dropdown').should('contain', 'Backpacking')
    cy.get('.trip-dropdown').should('contain', 'Custom')
    cy.get('.trip-dropdown').should('contain', 'Select a Trip')
    cy.get('.trip-submit').contains('SUBMIT')
    cy.get('.saved-lists-btn').contains('Saved Lists')
  })

  it.skip('user should be able to select a trip and get 4 items back', () => {
    cy.get('.trip-dropdown').select('Kayaking')
    cy.get('.trip-submit').click()
    cy.get('.list-name-input').should('have.attr', 'placeholder', 'Enter List Name')
    cy.get(':nth-child(1) > label > .item-name').contains('Hiking Boots')
    cy.get(':nth-child(1) > label > input').should('have.attr', 'type', 'checkbox')
    cy.get(':nth-child(4) > label > input').should('have.attr', 'type', 'checkbox')
    cy.get(':nth-child(4) > label > .item-name').contains('Suncreen')
    cy.get('.custom-item-input').should('have.attr', 'placeholder', 'Enter custom item')
    cy.get('.add-item').contains('Add Item')
    cy.get('.invalid-form').contains('Please fill out the list name and select at least one item!')
    cy.get('.submit-list-button').contains('Submit')
  })

  it.skip('a user should start at home and click the saved list button and be taken to the saved list page', () => {
    cy.get('.saved-lists-btn').contains('Saved Lists').click()
    cy.get('.home-button').contains('Back to Home')
    cy.get('.saved-header').contains('My List')
    cy.get('.no-list-message').contains('No list yet!')
  })
})

