const test = require('tap').test
const proxyquire = require('proxyquire')

const index = proxyquire('../index', {
  '../../lib/chunker': f => payload => f(payload),
  './makeRequest': token => path => body => Promise.resolve({ path, body, token }),
  './parse': parsed => ({ parsed }),
  './format': {
    conversation: formatted => ({ formatted}),
    message: formatted => ({ formatted }),
  },
  './token': () => Promise.resolve('foobar'),
})

test('send', assert => {
  var config = { bar: 'baz' }
  var msg = {
    service_user_id: 'morty',
    text: 'wubalubadubdub!',
  }

  var expected = {
    token: 'foobar',
    path: '/v3/conversations/undefined/activities',
    body: {
      formatted: msg,
    }
  }

  return index(config).send(msg)
    .then(res => assert.deepEquals(res, expected, 'formats and sends'))
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