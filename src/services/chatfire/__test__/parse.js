const { test } = require('tap')
const proxyquire = require('proxyquire')

const parse = proxyquire('../parse', {
  './token': () => Promise.resolve('authToken1234')
})

test('should parse a single text message', assert => {
  const msg = {
    userId: 'yonah_forst',
    body: 'Hello abi',
    at: 1439576628405,
  }

  const expected = [{
    service_name: 'chatfire',
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
    timestamp: 1439576628405,
  }]

  return parse({})(msg)
    .then(res => assert.deepEqual(res, expected, 'parses a single message'))
})

test('should parse a single picture message', t => {
  const msg = {
    userId: 'yonah_forst',
    attachments: [{
      url: 'http://someurl.com/image.png',
    }],
    at: 1439576628405,
  }

  const expected = [{
    service_name: 'chatfire',
    service_user_id: 'yonah_forst',
    attachments: [{
      url: 'http://someurl.com/image.png',
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