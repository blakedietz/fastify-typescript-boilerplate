import { gql, AuthenticationError } from 'apollo-server-fastify';

/*
 * TODO: Probably want to implement the directives with the SchemaDirectiveVisitor class as noted
 *  https://www.apollographql.com/docs/graphql-tools/schema-directives/
 */

const isAuthenticated = (next, source, args, context) => {
  if (context.auth.user.isAuthenticated) {
    return next();
  } else {
    throw new AuthenticationError('Not authenticated.');
  }
};

export const resolvers = {
  isAuthenticated,
};

export const typeDefs = gql`
  directive @isAuthenticated on FIELD_DEFINITION
`;
