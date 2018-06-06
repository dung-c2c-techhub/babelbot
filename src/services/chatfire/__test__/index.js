const { test } = require('tap')
const proxyquire = require('proxyquire')

const index = proxyquire('../index', {
  '../../lib/chunker': f => payload => f(payload),
  './makeRequest': token => path => body => Promise.resolve({ body, path, token }),
  './parse': config => parsed => ({ parsed }),
  './format': config => formatted => ({ formatted, userId: '12345', at: 67890 }),
  './token': () => Promise.resolve('foobar')
})

test('send', assert => {
  var msg = {
    service_user_id: 'morty',
    text: 'wubalubadubdub!'
  }

  var expected = {
    token: 'foobar',
    path: /\/messages\/morty\/\d+/,
    body: {
      formatted: msg
    }
  }

  const config = {}

  return index(config).send(msg)
    .then(res => assert.match(res, expected, 'formats and sends'))
})

test('parse', assert => {
  var msg = {
    service_user_id: 'morty',
    text: 'wubalubadubdub!'
  }

  var expected = {
    parsed: msg
  }
  assert.plan(1)
  assert.deepEquals(index({}).parse(msg), expected, 'parses')
})
