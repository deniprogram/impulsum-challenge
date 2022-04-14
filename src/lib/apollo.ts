import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({ uri: 'http://localhost:3000/api/graphql' })

const authLink = setContext((_, { headers }) => { 
  const token = localStorage.getItem('token');

  return {
    headers: {
        ...headers,
        authorization: token
      }
    }
  })

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: relayStylePagination(),
        },
      },
    },
  }),
});
