const { test } = require('tap')
const nock = require('nock')
const makeRequest = require('../makeRequest')

test('makes request', assert => {
  nock('https://www.googleapis.com', {
    reqheaders: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).post('/oauth2/v4/token')
    .query({ bar: 'baz' })
    .reply(200, {
      status: 'ok'
    })

  return makeRequest({ bar: 'baz' })
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'makes request'))
})
