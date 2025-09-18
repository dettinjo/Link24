/// <reference types="cypress" />

describe('Link Input Card', () => {

    var accExist = false

    
        it("setup", () => {
             cy.visit("/signup")
        cy.get("[type='email']").click()
        cy.get("[type='email']").type("jann.huschka@gmx.de")
        cy.get("[type='password']").eq(0).click()
        cy.get("[type='password']").eq(0).type("A12345678a")
        cy.get("[type='password']").eq(1).click()
        cy.get("[type='password']").eq(1).type("A12345678a")
        cy.get('[data-cy="button"]').click()

        })


    it("login", () => {
        cy.visit("/login")
        cy.get("[type='email']").click()
        cy.get("[type='email']").type("jann.huschka@gmx.de")
        cy.get("[type='password']").click()
        cy.get("[type='password']").type("A12345678a")
        cy.get('[data-cy="button"]').click()
        cy.wait(2000)
    
    })

    it("generate Link an create custom Url", () => {

        cy.get('[data-cy="LinkInput"]').click()
        cy.get('[data-cy="LinkInput"]').type("www.hdm-stuttgart.de")
        cy.get('[data-cy="button"]').contains("Generate").click()
        cy.wait(1000)


        cy.document().then((doc) => {
            const value = doc.querySelector('[data-cy="LinkInput"]').value;
           cy.visit(value)
        });
        
       
    })
    
    

})