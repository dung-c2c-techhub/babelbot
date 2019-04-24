const test = require('tap').test
const nock = require('nock')
const makeRequest = require('../makeRequest')

const mittoNock = nock('https://api.mitto.ch')
const credentials = {
  username: 'username'
  API_key: 'foo',	
}

test('makes request', assert => {
  mittoNock.post('/sms/', {
    bar: 'baz',
  }).reply(200, {
    status: 'DELIVERED'
  })

  return makeRequest(credentials)('/foo')({ bar: 'baz' })
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'makes request'))
})



test('makes request', t => {
  oxygen8Nock.post('/foo', {
    bar: 'baz',
  })
  .reply(200, {
    status: 'ok'
  })

  return makeRequest(credentials)({ bar: 'baz' })
    .then(res => t.deepEquals(res, { status: 'ok' }, 'makes request'))
})
