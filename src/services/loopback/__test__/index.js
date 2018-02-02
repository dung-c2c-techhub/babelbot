const { test } = require('tap')
const nock = require('nock')
const index = require('../index')

const loopbackNock = nock('https://foo.bar')
var payload = {
	service_user_id: 'https://foo.bar/baz',
	bar: 'baz',
  timestamp: 1234567,
}

test('send', assert => {
  loopbackNock.post('/baz', payload)
  .reply(200, {
    status: 'ok'
  })



  return index().send(payload)
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'forwards body to service_user_id'))
})

test('parse', assert => {
  var expected = [{
    service_user_id: 'https://foo.bar/baz',
    service_name: 'loopback',
    timestamp: 1234567,
    bar: 'baz',
  }]

	return index().parse(payload)
		.then(res => assert.deepEquals(res, expected, 'returns payload in an array'))
})
