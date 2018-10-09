const test = require('tap').test
const format = require('../format')

test('should format a single text message', assert => {
  const msg = {
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
  }

  const expected = {
    chat_id: 'yonah_forst',
    text: 'Hello abi',
    parse_mode:"HTML"
  }
  
  assert.plan(1)
  assert.deepEqual(format(msg), expected)
})


test('should format a single text message and merges options', assert => {
  const msg = {
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
    options: { foo: 'bar' },
  }

  const expected = {
    chat_id: 'yonah_forst',
    text: 'Hello abi',
    parse_mode:"HTML",
    foo: 'bar',
  }
  
  assert.plan(1)
  assert.deepEqual(format(msg), expected)
})