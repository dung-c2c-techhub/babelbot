const test = require('tap').test
const proxyquire = require('proxyquire')

const index = proxyquire('../index', {
  './makeRequest': config => path => body => Promise.resolve({ path, body, config }),
  './parse': parsed => ({ parsed }),
  './format': config => formatted => ({ formatted }),
  '../../lib/chunker': func => payload => func(payload),
})

test('send', assert => {
  var config = { bar: 'baz' }
  var msg = {
    service_user_id: 'morty',
    text: 'wubalubadubdub!',
  }

  var expected = {
    config,
    path: '/Messages.json',
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