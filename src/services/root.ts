// If you prefer async/await, use the following
export default async function(fastify, opts) {
    fastify.get('/', async function(request, reply) {
        return { root: true };
    });
}
