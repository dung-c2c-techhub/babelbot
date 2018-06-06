const { test } = require('tap')
const format = require('../format')

test('should format a single text message', assert => {
  const msg = {
    service_user_id: 'yonah_forst',
    text: 'Hello abi'
  }

  const config = {
    bot_id: 'abibot'
  }

  const expected = {
    isBot: true,
    userId: 'abibot',
    body: 'Hello abi',
    at: /\d+/
  }

  assert.plan(1)
  assert.match(format(config)(msg), expected)
})
