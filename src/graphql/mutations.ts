import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
      user {
        name
      }
    }
  }
`;

export const NEW_USER = gql`
  mutation NewUser($email: String!, $lastName: String!, $name: String!) {
    newUser(input : {email: $email, lastName: $lastName, name: $name}) {
      id
    }
  }
`;