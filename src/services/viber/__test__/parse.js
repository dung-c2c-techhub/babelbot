'use strict'

const { test } = require('tap')
const parse = require('../parse')

test('should parse a single text message', t => {
  const msg = require('./events/viber_message.json')
  const expected = [{
    service_name: 'viber',
    service_user_id: '01234567890A=',
    text: 'Hello abi',
    timestamp: 1457764197627
  }]

  return parse(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should parse a single picture message', t => {
  const msg = require('./events/viber_image.json')
  const expected = [{
    service_name: 'viber',
    service_user_id: '01234567890A=',
    attachments: [{
      url: 'http://viber.com/image.png'
    }],
    timestamp: 1439576628405
  }]

  return parse(msg)
    .then(response => t.deepEqual(response, expected))
})
