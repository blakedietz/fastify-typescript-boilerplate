import { test } from 'tap';

import Fastify from 'fastify';

import Support from '../../plugins/support';

// If you prefer async/await, use the following
test('support works standalone', async t => {
  const fastify = Fastify();
  fastify.register(Support);

  await fastify.ready();

  // @ts-ignore
  t.equal(fastify.someSupport(), 'hugs');
});
