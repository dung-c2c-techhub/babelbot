'use strict'

const test = require('tap').test
const parse = require('../parse')

test('should parse a single text message', t => {
  const msg = require('./events/messenger_single.json')
  const expected = [{
    service_name: 'messenger',
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
    timestamp: 1439576628405,
  }]

  return parse(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should parse a single picture message', t => {
  const msg = require('./events/messenger_image.json')
  const expected = [{
    service_name: 'messenger',
    service_user_id: 'yonah_forst',
    attachments: [{ 
      url: 'http://messenger.com/image.png',
    }],
    timestamp: 1439576628405,
  }]

  return parse(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should parse multiple messages, and ignore echo', t => {
  const msg = require('./events/messenger_multiple.json')
  const expected = [
    {
      service_name: 'messenger',
      service_user_id: 'yonah_forst',
      text: 'Hello abi',
      timestamp: 1439576628405,
    },
    {
      service_name: 'messenger',
      service_user_id: 'yonah_forst',
      text: 'Second',
      timestamp: 1439576628405,
    },
  ]

  return parse(msg)
    .then(response => t.deepEqual(response, expected))
})


test('should parse a postback', t => {
  const msg = require('./events/messenger_postback.json')
  const expected = [{
    service_name: 'messenger',
    service_user_id: 'yonah_forst',
    timestamp: 1439576628405,
    referral: 'c1234567',
  }]

  return parse(msg)
    .then(response => t.deepEqual(response, expected))
})