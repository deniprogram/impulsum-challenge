import { ApolloServer } from 'apollo-server-micro';
import { PageConfig } from 'next';
import { typeDefs } from '../../backend/graphql/schema';
import { createContext } from '../../backend/graphql/context';
import { resolvers } from '../../backend/graphql/resolvers'
import connectDb from '../../backend/db/config'
connectDb()

const apolloServer = new ApolloServer({
  context: createContext,
  typeDefs,
  resolvers
});

const startServer = apolloServer.start();

export default async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
