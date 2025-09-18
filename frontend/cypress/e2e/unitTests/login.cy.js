/// <reference types="cypress" />

describe('verify correct request and response', () => {

    beforeEach(() => {
        cy.visit("/login")
    })
    
    it("should diplay shortend URL with mock", () => {
       
   cy.get("[type='email']").click()
   cy.get("[type='email']").type("one@two.de")
   cy.get("[type='password']").eq(0).click()
   cy.get("[type='password']").eq(0).type("A1234567a")
   cy.get('[data-cy="button"]').click()
   cy.contains("Email and/or password wrong, please try again")
    })

})