const test = require('tap').test
const nock = require('nock')
const makeRequest = require('../makeRequest')

const lineNock = nock('https://api.line.me')
const credentials = {
	channelAccessToken: 'foobar',
}

test('makes request', assert => {
  lineNock.post('/foo', {
    bar: 'baz',
  }).reply(200, {
    status: 'ok'
  })

  return makeRequest(credentials)('/foo')({ bar: 'baz' })
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'makes request'))
})
