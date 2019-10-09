import { Container } from 'typedi';
import { AccountController } from '../../context/account/account.controller';
import { decode } from 'jsonwebtoken';

export default async function(fastify, opts) {
  fastify.post('/account/create', async function(
    { body: { userName, email, password } },
    reply,
  ) {
    const accountController = Container.get(AccountController);
    accountController.create({ userName, email, password });
  });

  fastify.route({
    method: 'POST',
    url: '/account/verify',
    preHandler: async function(request, reply, done) {
      fastify.validateJwtAccountVerify(request, reply, done);
    },
    handler: async function(request, reply) {
      const { email } = decode(
        request.headers.authorization.replace(/Bearer /, ''),
      );
      await Container.get(AccountController).verify({
        email,
      });

      return {};
    },
  });

  fastify.route({
    method: 'POST',
    url: '/account/verify/new',
    handler: async function({ body: { email } }, reply) {
      await Container.get(AccountController).sendVerificationEmail({
        email,
      });

      return {};
    },
  });

  // fastify.post('/account/verify', async function(request, reply) {});
  // fastify.get('/account', async function(request, reply) {
  //   const accountController = Container.get(AccountController);
  //   return accountController.getAll();
  // });
  // fastify.post('/account/login', async function(
  //   { body: { userName, password, email } },
  //   reply,
  // ) {
  //   const accountController = Container.get(AccountController);
  //
  //   try {
  //     const jwt = await accountController.createJwt({ email, password });
  //     return { jwt };
  //   } catch (e) {
  //     console.error(e);
  //     reply.code(401);
  //   }
  //   return {};
  // });
  // fastify.put('/account/:id/update-password', async function() {});
  // fastify.post('/account/close', async function(
  //   { body: { username, password } },
  //   reply,
  // ) {
  //   // TODO: (bdietz) -
  //   return;
  // });
}
