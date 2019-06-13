const test = require('tap').test
const nock = require('nock')
const makeRequest = require('../makeRequest')

const mittoNock = nock('https://api.mitto.ch')
const config = {
	API_key: 'token123',
}
/*
test('makes request', assert => {
  
  mittoNock.post('/sms', {        
      message: 'text',
  }).reply(200, {
    status: 'ok'
  })

  return makeRequest(config)('/sms')({ message: 'baz' })
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'makes request'))
})*/