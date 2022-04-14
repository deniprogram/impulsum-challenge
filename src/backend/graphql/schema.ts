import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type User {
    id: String
    name: String
    lastName: String
    password: String
    email: String
    isAdmin: Boolean
  }

  input UserInput {
    name: String!
    lastName: String!
    email: String!
    password: String
    isAdmin: Boolean
  }

  type Query {
    users: [User]
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Mutation {
    newUser(input: UserInput): User
    login(email: String!, password: String!): AuthPayload
  }
`