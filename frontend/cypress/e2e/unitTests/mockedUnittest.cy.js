/// <reference types="cypress" />

describe('verify correct request and response', () => {

    beforeEach(() => {
        cy.visit("/")
    })
    
    it("should diplay shortend URL with mock", () => {
        cy.intercept("POST", "http://localhost:8080/links", {
            fixture: "postMock.json"
        })
        cy.get('[data-cy="LinkInput"]').click()
        cy.get('[data-cy="LinkInput"]').type("hdm-stuttgart.de") 
        cy.get('[data-cy="button"]').click()
        cy.get('[data-cy="LinkInput"]').should("have.value", "localhost:3000/helloLink24")
       

    })

})