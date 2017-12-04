const test = require('tap').test
const nock = require('nock')
const makeRequest = require('../makeRequest')

const kikNock = nock('https://api.twilio.com')
const credentials = {
	apiKeySid: 'foo',
	apiKeySecret: 'bar',
	accountSid: 'baz'
}

test('makes request', assert => {
  kikNock.post('/2010-04-01/Accounts/baz/foo', {
    bar: 'baz',
  }).reply(200, {
    status: 'ok'
  })

  return makeRequest(credentials)('/foo')({ bar: 'baz' })
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'makes request'))
})
