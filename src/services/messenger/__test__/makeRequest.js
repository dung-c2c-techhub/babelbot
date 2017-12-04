const test = require('tap').test
const nock = require('nock')
const makeRequest = require('../makeRequest')

const kikNock = nock('https://graph.facebook.com')
const credentials = {
	pageAccessToken: 'foobar',
}

test('makes request', assert => {
  kikNock.post('/foo?access_token=foobar', {
    bar: 'baz',
  }).reply(200, {
    status: 'ok'
  })

  return makeRequest(credentials)('/foo')({ bar: 'baz' })
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'makes request'))
})
