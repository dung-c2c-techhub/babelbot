'use strict'

const test = require('tap').test
const parse = require('../parse')

const config = {
  channelAccessToken: 'foobar',
}

test('should parse a single text message', t => {
  const msg = require('./events/line_single.json')
  const expected = [{
    service_name: 'line',
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
    timestamp: 1439576628405,
  }]

  return parse({})(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should parse a single picture message', t => {
  const msg = require('./events/line_image.json')
  const expected = [{
    service_name: 'line',
    service_user_id: 'yonah_forst',
    attachments: [{ 
      url: 'https://api.line.me/v2/bot/message/325708/content',
      options: {
        headers: {
          'Authorization': 'Bearer foobar'
        }
      }
    }],
    timestamp: 1439576628405,
  }]

  return parse(config)(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should parse multiple messages', t => {
  const msg = require('./events/line_multiple.json')
  const expected = [
    {
      service_name: 'line',
      service_user_id: 'yonah_forst',
      text: 'Hello abi',
      timestamp: 1439576628405,
    },
    {
      service_name: 'line',
      service_user_id: 'yonah_forst',
      text: 'Second',
      timestamp: 1439576628405,
    },
  ]

  return parse({})(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should ignore non text messages', t => {
  const msg = require('./events/line_other.json')
  const expected = []

  return parse({})(msg)
    .then(response => t.deepEqual(response, expected))
})
