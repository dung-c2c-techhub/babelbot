const test = require('tap').test
const nock = require('nock')
const makeRequest = require('../makeRequest')

const telegramNock = nock('https://api.telegram.org')
const credentials = {
	token: 'token123',
}

test('makes request', assert => {
  telegramNock.post('/bottoken123/foo', {
    bar: 'baz',
  }).reply(200, {
    status: 'ok'
  })

  return makeRequest(credentials)('/foo')({ bar: 'baz' })
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'makes request'))
})
