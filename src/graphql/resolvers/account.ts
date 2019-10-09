import { gql } from 'apollo-server-fastify';
import { Container } from 'typedi';
import { AccountController } from '../../context/account/account.controller';
import { AccountVerifyService } from '../../context/account/account-verify.service';
import { decode } from 'jsonwebtoken';

export const typeDefs = gql`
  extend type Mutation {
    createAccount(input: CreateAccountInput): CreateAccountPayload
    verifyAccount(input: VerifyAccountInput): VerifyAccountPayload
    #    login(input: LoginInput): AuthPayload
  }

  input CreateAccountInput {
    userName: String
    email: String
    password: String
  }

  type CreateAccountPayload {
    userCreated: Boolean
  }

  input VerifyAccountInput {
    token: String
  }

  type VerifyAccountPayload {
    account: Account
  }

  input LoginInput {
    email: String
    password: String
  }

  type AuthPayload {
    token: String
    account: Account
  }

  type Account {
    id: ID!
    email: String!
    userName: String!
    isVerified: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

export const resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { input: { email, userName, password } },
      context,
    ) => {
      const accountController: AccountController = Container.get(
        AccountController,
      );

      await accountController.create({ email, userName, password });
      return { accountCreated: true };
    },
    verifyAccount: async (_, { input: { token } }, context) => {
      const accountController: AccountController = Container.get(
        AccountController,
      );
      const accountVerifyService = Container.get(AccountVerifyService);
      const isValid = accountVerifyService.isValidJwt({ jwt: token });
      if (isValid) {
        const { email } = decode(token);
        await accountController.verify({ email });
        return { accountVerified: true };
      } else {
        return { accountVerified: false };
      }
    },
  },
};
