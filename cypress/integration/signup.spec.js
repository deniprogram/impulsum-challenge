/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

const email = faker.internet.email()
const name = faker.internet.userName()
const lastName = faker.internet.userName()

const domain = Cypress.env('domain')

describe('Navigation', () => {
    it('Should navigate to the Signup page', () => {
        cy.visit(domain)

        cy.get('#button-sign-up').click()

        cy.url().should('include', '/admin/users/create')
        cy.get('h2').contains('Create user')
    })
})

describe('Create user', () => {
    beforeEach(() => {
        cy.visit(`${domain}/admin/users/create`)
    })

    it('Should create new user', () => {
        cy.get('#name').type(name)
        cy.get('#lastName').type(lastName)
        cy.get('#email').type(email)
        cy.get('#saveUserButton').click()
        cy.wait(3000)
        cy.url().should('eq', `${domain}/`)
    })

    it('Should not create new user', () => {
        cy.get('#name').type(name)
        cy.get('#lastName').type(lastName)
        cy.get('#email').type(email)
        cy.get('#saveUserButton').click()
        cy.wait(3000)
        cy.url().should('eq', `${domain}/admin/users/create`)
    })

    it('Should cancel create new user', () => {
        cy.get('#name').type(name)
        cy.get('#lastName').type(lastName)
        cy.get('#email').type(email)
        cy.get('#cancelNewUserButton').click()
        cy.url().should('eq', `${domain}/`)
    })
})