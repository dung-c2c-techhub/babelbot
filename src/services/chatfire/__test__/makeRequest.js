const test = require('tap').test
const nock = require('nock')
const makeRequest = require('../makeRequest')

test('makes request', assert => {
  nock('https://project_123.firebaseio.com', {
  	reqheaders: {
      'authorization': 'Bearer some_token',
    }
  }).put('/foo', {
    bar: 'baz',
  }).reply(200, {
    status: 'ok'
  })

  const config = {
    access_token: 'some_token',
    project_id: 'project_123',
  }

  return makeRequest(config)('/foo')({ bar: 'baz' })
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'makes request'))
})
