const test = require('tap').test
const format = require('../format')

test('should format a single text message', assert => {
  const msg = {
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
  }

  const expected = {
    to: 'yonah_forst',
    messages: [{
      text: 'Hello abi',
      type: 'text',
    }],
  }
  
  assert.plan(1)
  assert.deepEqual(format(msg), expected)
})