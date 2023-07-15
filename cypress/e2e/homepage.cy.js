describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('POST','https://packmate-be-d3fb267b5fee.herokuapp.com/graphql', {
      statusCode: 200,
      fixture: 'sampleData.json'
    })
    cy.visit("localhost:3000")
  });

  it('should open up to the home page', () => {
    
  })
})