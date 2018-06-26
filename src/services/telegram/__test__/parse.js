'use strict'

const { test } = require('tap')
const proxyquire = require('proxyquire')
const parse = proxyquire('../parse', {
  './getAttachmentUrl': config => file_id => Promise.resolve('https://attachment.com/' + file_id)
})

const config = {
  token: 'foobar',
}

test('should parse a single text message', t => {
  const msg = require('./events/single.json')
  const expected = [{
    service_name: 'telegram',
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
    timestamp: 1439576628000,
  }]

  return parse({})(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should parse start command with referral code', t => {
  const msg = require('./events/referral.json')
  const expected = [{
    service_name: 'telegram',
    service_user_id: 'yonah_forst',
    text: '/start',
    referral: 'abc1234',
    timestamp: 1439576628000,
  }]

  return parse({})(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should parse a single picture message', t => {
  const msg = require('./events/image.json')
  const expected = [{
    service_name: 'telegram',
    service_user_id: 'yonah_forst',
    attachments: [{ 
      url: 'https://attachment.com/789',
    }],
    timestamp: 1439576628000,
  }]

  return parse(config)(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should parse a document message with images', t => {
  const msg = require('./events/document-image.json')
  const expected = [{
    service_name: 'telegram',
    service_user_id: 'yonah_forst',
    attachments: [{ 
      url: 'https://attachment.com/fileid',
    }],
    timestamp: 1439576628000,
  }]

  return parse(config)(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should ignore a document message without images', t => {
  const msg = require('./events/document-no-image.json')
  const expected = []
  
  return parse(config)(msg)
    .then(response => t.deepEqual(response, expected))
})

test('should ignore non text messages', t => {
  const msg = require('./events/other.json')
  const expected = []

  return parse({})(msg)
    .then(response => t.deepEqual(response, expected))
})
