/// <reference types="cypress" />

describe('Link Input Card', () => {

    beforeEach(() => {
        cy.visit("localhost:3000")
    })
    it("should display typed text", () => {
       
        cy.get('[data-cy="LinkInput"]').click()
        cy.get('[data-cy="LinkInput"]').type("hdm-stuttgart.de")
        cy.get('[data-cy="LinkInput"]').should("have.value", "hdm-stuttgart.de")

        
    })

    it("should emtpy when clicking new ", () => {
       
        cy.get('[data-cy="LinkInput"]').click()
        cy.get('[data-cy="LinkInput"]').type("hdm-stuttgart.de") 
        cy.get('[data-cy="button"]').click()
        cy.wait(120)
        cy.get('[data-cy="button"]').contains("New link").click()
        cy.get('[data-cy=LinkInput]').should('have.value', '');
        
    })
   
})
