const test = require('tap').test
const nock = require('nock')
const makeRequest = require('../makeRequest')

const kikNock = nock('https://skype.botframework.com')


test('makes request', assert => {
  kikNock.post('/foo', {
    bar: 'baz',
  }).reply(200, {
    status: 'ok'
  })

  return makeRequest('foobar')('/foo')({ bar: 'baz' })
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'makes request'))
})
