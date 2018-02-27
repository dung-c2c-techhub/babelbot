const test = require('tap').test
const nock = require('nock')
const makeRequest = require('../makeRequest')

test('makes request', assert => {
  nock('https://bar.baz', {
  	reqheaders: {
      'authorization': 'Bearer some_token',
      'content-type': 'application/json',
    }
  }).post('/foo', {
    bar: 'baz',
  }).reply(200, {
    status: 'ok'
  })

  return makeRequest('some_token')('https://bar.baz/foo')({ bar: 'baz' })
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'makes request'))
})
