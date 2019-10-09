import fp from 'fastify-plugin';
import { Container } from 'typedi';
import { AccountVerifyService } from '../context/account/account-verify.service';
import {
  InvalidTokenError,
  NoAuthorizationHeaderError,
} from '../context/account/errors';
import { decode } from 'jsonwebtoken';

export default fp(async function(fastify, opts) {
  fastify.decorate('validateJwtAccountVerify', async function(
    request,
    reply,
    done,
  ) {
    if (!request.headers.authorization) {
      throw new NoAuthorizationHeaderError();
    }
    const token = request.headers.authorization.replace(/Bearer /, '');
    const accountVerifyService = Container.get(AccountVerifyService);
    const tokenIsValid = await accountVerifyService.isValidJwt({ jwt: token });

    if (!tokenIsValid) {
      throw new InvalidTokenError();
    }
  });

  // fastify.decorate('validateJwtPasswordReset', async function(
  //   request,
  //   reply,
  // ) {});
  // fastify.decorate('validateJwtSession', async function(
  //   request,
  //   reply,
  //   done,
  // ) {});
});
