'use strict'

const test = require('tap').test
const format = require('../format')

test('should format a single text message', assert => {
  const config = {
    messagingServiceSid: 'sid1234',
  }

  const msg = {
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
  }

  const expected = {
    To: 'yonah_forst',
    MessagingServiceSid: 'sid1234',
    Body: 'Hello abi' 
  }
  
  assert.plan(1)
  assert.deepEqual(format(config)(msg), expected)
})