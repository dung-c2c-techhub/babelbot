'use strict'

const test = require('tap').test
const format = require('../format')

test('should format a single text message', assert => {
  const msg = {
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
  }

  const expected = {
    messages: [{
      to: 'yonah_forst',
      body: 'Hello abi',
      type: 'text',
    }],
  }
  
  assert.plan(1)
  assert.deepEqual(format(msg), expected)
})