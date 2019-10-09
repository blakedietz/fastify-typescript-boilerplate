import { ApolloServer, makeExecutableSchema } from 'apollo-server-fastify';
import { context } from './context';
import { resolvers, typeDefs } from './schema';
import { directiveResolvers } from './schema';

export const server = new ApolloServer({
  context,
  schema: makeExecutableSchema({
    resolvers,
    typeDefs,
    directiveResolvers,
  }),
});
