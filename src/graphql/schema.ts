import { gql } from 'apollo-server-fastify';
import { merge } from 'lodash';
import {
  resolvers as helloResolvers,
  typeDefs as helloTypeDefs,
} from './resolvers/hello';
import {
  typeDefs as authorizationDirectiveTypeDefs,
  resolvers as authorizationDirectiveResolvers,
} from './directives/authorization';
import {
  typeDefs as authenticationDirectiveTypeDefs,
  resolvers as authenticationDirectiveResolvers,
} from './directives/authentication';

export const resolvers = merge(helloResolvers);

export const directiveResolvers = merge(
  authenticationDirectiveResolvers,
  authorizationDirectiveResolvers,
);

const queryTypeDef = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [
  authenticationDirectiveTypeDefs,
  authorizationDirectiveTypeDefs,
  queryTypeDef,
  helloTypeDefs,
];
