'use strict'

const test = require('tap').test
const proxyquire = require('proxyquire')

const parse = proxyquire('../parse', {
  './token': () => Promise.resolve('authToken1234')
})

test('should parse a single text message', t => {
  const msg = require('./events/single.json')
  const expected = [{
    service_name: 'skype',
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
    timestamp: 1439576628405,
  }]

  return parse({})(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should parse a single picture message', t => {
  const msg = require('./events/image.json')
  const expected = [{
    service_name: 'skype',
    service_user_id: 'yonah_forst',
    attachments: [{
      url: 'http://skype.com/image.png',
      options: {
        headers: {
          'Authorization': `Bearer authToken1234`,
        },
      },
    }],
    timestamp: 1439576628405,
  }]

  return parse({})(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should ignore non text messages', t => {
  const other = require('./events/other.json')
  const expected = []

  return parse({})(other)
    .then(response => t.deepEqual(response, expected))
})
