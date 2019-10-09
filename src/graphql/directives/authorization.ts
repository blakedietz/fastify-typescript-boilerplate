import {
  gql,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-fastify';

/*
 * TODO: Probably want to implement the directives with the SchemaDirectiveVisitor class as noted
 *  https://www.apollographql.com/docs/graphql-tools/schema-directives/
 */

const hasScope = (next, source, args, context) => {
  if (!context.auth.user.isAuthenticated) {
    throw new AuthenticationError('Not authenticated.');
  }

  const { scope: expectedScopes } = args;
  const { permissions: scopes } = context.auth.user;

  if (expectedScopes.some(scope => scopes.indexOf(scope)) !== -1) {
    return next();
  } else {
    throw new ForbiddenError('Not authorized to complete action.');
  }
};

export const resolvers = {
  hasScope,
};

export const typeDefs = gql`
  directive @hasScope(scope: [String]) on FIELD_DEFINITION
`;
