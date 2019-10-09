import { gql } from 'apollo-server-fastify';

export const typeDefs = gql`
  extend type Query {
    hello: String
  }
`;

export const resolvers = {
  Query: {
    hello: async () => {
      return 'hello';
    },
  },
};
