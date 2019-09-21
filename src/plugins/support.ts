import fp from 'fastify-plugin';
// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

// If you prefer async/await, use the following

export default fp(async function(fastify, opts) {
    fastify.decorate('someSupport', function() {
        return 'hugs';
    });
});
