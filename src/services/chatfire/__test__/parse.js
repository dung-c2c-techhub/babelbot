const { test } = require('tap')
const parse = require('../parse')

test('should parse a single text message', assert => {
  const msg = {
    userId: 'yonah_forst',
    body: 'Hello abi',
    at: 1439576628405,
  }

  const expected = [{
    service_name: 'chatfire',
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
    timestamp: 1439576628405,
  }]

  return parse(msg)
    .then(res => assert.deepEqual(res, expected, 'parses a single message'))
})