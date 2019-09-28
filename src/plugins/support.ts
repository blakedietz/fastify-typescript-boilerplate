import fp from 'fastify-plugin';

export default fp(async function(fastify, opts) {
  fastify.decorate('someSupport', function() {
    return 'hugs';
  });
});
