/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

const email = faker.internet.email()
const password = faker.internet.password()

const domain = Cypress.env('domain')

describe('Log in', () => {
    beforeEach(() => {
        cy.visit(`${domain}`)
    })

    it('Should log in', () => {
        cy.get('#email').type('jo44hndoe@example2.com')
        cy.get('#password').type('123')

        cy.get('#buttonLogin').click()
        cy.wait(3000)
        cy.url().should('eq', `${domain}/admin/users`)
    })

    it('Should not log in', () => {
        cy.get('#email').type(email)
        cy.get('#password').type(password)

        cy.get('#buttonLogin').click()
        cy.wait(1000)
        cy.url().should('eq', `${domain}/`)
    })
})