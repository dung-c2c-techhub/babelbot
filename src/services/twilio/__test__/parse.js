'use strict'

const test = require('tap').test
const parse = require('../parse')

test('should parse a single text message', t => {
  const msg = {
    From: '+123456789',
    Body: 'Hello, world!',
    Timestamp: 1458692752478,
  }

  const expected = [{
    service_name: 'twilio',
    service_user_id: '+123456789',
    text: 'Hello, world!',
    timestamp: 1458692752478,
  }]

  return parse(msg)
    .then(response => t.deepEqual(response, expected))
})

test('timestamp is missing', t => {
  const msg = {
    From: '+123456789',
    Body: 'Hello, world!',
  }

  return parse(msg)
    .then(res => t.true(res[0].timestamp, 'uses current timestamp'))
})