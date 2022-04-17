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
        cy.get('#email').type('admin@admin.com')
        cy.get('#password').type('Th1sP422w0rd')

        cy.get('#buttonLogin').click()
        cy.intercept('POST', '/api/graphql').as('login')
        cy.wait('@login')
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