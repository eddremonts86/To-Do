// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('p', 'Eduardo Inerarte')
    cy.contains('p', 'eduardo.inerarte@gmail.com')
    cy.get('h2[data-cy=ProjectsList]').click()
  })
})
