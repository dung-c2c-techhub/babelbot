const { test } = require('tap')
const parse = require('../parse')


test('should parse a single message from query', t => {
  var msg ={
    Shortcode: 'short123',
    MSISDN: '123456789',
    Content: 'Hello, world!',
    DateReceived: 1458692752,
  }

  var expected = [{
    service_name: 'oxygen8',
    service_user_id: '123456789:short123',
    text: 'Hello, world!',
    timestamp: 1458692752000,
  }]

  return parse(msg)
    .then(response => t.deepEqual(response, expected))
})

test('returns nothing if missing text or service_user_id', t => {
  var msg ={
    Reference: '12.1764.1505985714.31',
    Status: 'DELIVERED',
    DateDelivered: 1505985720,
  }

  return parse(msg)
    .then(response => t.deepEqual(response, []))
})