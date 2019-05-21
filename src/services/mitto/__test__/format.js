const { test } = require('tap')
const format = require('../format')

test('should format a single text message', assert => {
  const msg = {
    service_user_id: '1234567890:MASK123',
    text: 'Hello, world!',
  }

  const expected = {        
    text: 'Hello, world!',
    to: '1234567890',
    from: 'MASK123',
  }

  assert.plan(1)
  assert.deepEqual(format({})(msg), expected)
})
