describe('Error Page', () => {
  beforeEach(() => {
    cy.visit("localhost:3000")
  })

  it('when a user types in a bad URL they should see an error message', () => {
    cy.visit('localhost:3000/badURL')
    cy.get('.error-container > h1').contains('Something went wrong... Error:')
    cy.get('.logo').should('have.attr', 'alt', 'Packmate Logo of a suitcase')
    cy.get('.app-name').contains('PackMate')
  })
})