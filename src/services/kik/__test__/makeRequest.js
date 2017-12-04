const test = require('tap').test
const nock = require('nock')
const makeRequest = require('../makeRequest')

const kikNock = nock('https://api.kik.com')
const credentials = {
	username: 'foo',
	apiKey: 'bar',
}

test('makes request', assert => {
  kikNock.post('/foo', {
    bar: 'baz',
  }).reply(200, {
    status: 'ok'
  })

  return makeRequest(credentials)('/foo')({ bar: 'baz' })
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'makes request'))
})
