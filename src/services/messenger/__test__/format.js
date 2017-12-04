const test = require('tap').test
const format = require('../format')

test('should format a single text message', assert => {
  const msg = {
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
  }

  const expected = {
    messaging_type: 'RESPONSE',
    recipient: {
      id: 'yonah_forst',
    },
    message: {
      text: 'Hello abi',
    },
  }
  
  assert.plan(1)
  assert.deepEqual(format(msg), expected)
})