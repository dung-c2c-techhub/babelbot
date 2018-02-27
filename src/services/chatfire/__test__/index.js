const { test } = require('tap')
const proxyquire = require('proxyquire')

const index = proxyquire('../index', {
  '../../lib/chunker': f => payload => f(payload),
  './makeRequest': token => url => body => Promise.resolve({ body, url, token }),
  './parse': parsed => ({ parsed }),
  './format': formatted => ({ formatted, userId: '12345' }),
  './token': () => Promise.resolve('foobar'),
})

test('send', assert => {
  var config = { databaseUrl: 'https://bar.baz/foo' }

  var msg = {
    service_user_id: 'morty',
    text: 'wubalubadubdub!',
  }

  var expected = {
    token: 'foobar',
    url: /https:\/\/bar.baz\/foo\/12345\/\d+/,
    body: {
      formatted: msg,
    }
  }

  return index(config).send(msg)
    .then(res => assert.match(res, expected, 'formats and sends'))
})

test('parse', assert => {
  var msg = {
    service_user_id: 'morty',
    text: 'wubalubadubdub!',
  }

  var expected = {
    parsed: msg
  }
  assert.plan(1)
  assert.deepEquals(index({}).parse(msg), expected, 'parses')
})
