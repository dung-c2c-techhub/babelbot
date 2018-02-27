const { test } = require('tap')
const format = require('../format')

test('should format a single text message', assert => {
  const msg = {
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
  }

  const expected = {
    userId: 'yonah_forst',
    body: 'Hello abi',
    at: /\d+/,
  }

  assert.plan(1)
  assert.match(format(msg), expected)
})