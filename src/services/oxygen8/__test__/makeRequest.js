const { test } = require('tap')
const nock = require('nock')
const makeRequest = require('../makeRequest')

const oxygen8Nock = nock('https://relay.uk.oxygen8.com', {
  reqheaders: {
  	'content-type': 'application/x-www-form-urlencoded',
  	'authorization': 'Basic Zm9vOnVuZGVmaW5lZA==',
  }
})

const credentials = {
	username: 'foo',
	password: 'bar',
	targetUrl: '/foo',
}

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
