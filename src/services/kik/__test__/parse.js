'use strict'

const test = require('tap').test
const parse = require('../parse')

test('should parse a single text message', t => {
  const msg = require('./events/kik_single.json')
  const expected = [{
    service_name: 'kik',
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
    timestamp: 1439576628405,
  }]

  return parse(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should parse a single picture message', t => {
  const msg = require('./events/kik_image.json')
  const expected = [{
    service_name: 'kik',
    service_user_id: 'yonah_forst',
    attachments: [{ 
      url: 'http://kik.com/image.png',
    }],
    timestamp: 1439576628405,
  }]

  return parse(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should parse multiple messages', t => {
  const msg = require('./events/kik_multiple.json')
  const expected = [
    {
      service_name: 'kik',
      service_user_id: 'yonah_forst',
      text: 'Hello abi',
      timestamp: 1439576628405,
    },
    {
      service_name: 'kik',
      service_user_id: 'yonah_forst',
      text: 'Second',
      timestamp: 1439576628405,
    },
  ]

  return parse(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should ignore non text messages', t => {
  const other = require('./events/kik_other.json')
  const expected = []

  return parse(other)
    .then(response => t.deepEqual(response, expected))
})
