const { test } = require('tap')
const { build } = require('../helper')

// If you prefer async/await, use the following

test('default root route', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/'
  })
  t.deepEqual(JSON.parse(res.payload), { root: true })
})
