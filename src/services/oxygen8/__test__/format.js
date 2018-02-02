const { test } = require('tap')
const format = require('../format')

test('should format a single text message', assert => {
  const msg = {
    service_user_id: '1234567890:MASK123',
    text: 'Hello, world!',
  }

  const expected = {
    Channel: 'BULK',
    MSISDN: '1234567890',
    Content: 'Hello, world!',
    Mask: 'MASK123',
    Multipart: '1',
  }

  assert.plan(1)
  assert.deepEqual(format({})(msg), expected)
})

test('uses defauls mask from config', assert => {
  const msg = {
    service_user_id: '1234567890',
    text: 'Hello, world!',
  }

  const expected = {
    Channel: 'BULK',
    MSISDN: '1234567890',
    Content: 'Hello, world!',
    Mask: 'foo',
    Multipart: '1',
  }

  assert.plan(1)
  assert.deepEqual(format({ defaultMask: 'foo'})(msg), expected)
})