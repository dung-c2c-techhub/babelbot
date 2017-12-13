const { test } = require('tap')
const nock = require('nock')
const index = require('../index')

const loopbackNock = nock('https://foo.bar')
var payload = {
	serviceUserId: 'https://foo.bar/baz',
	bar: 'baz',
}

test('send', assert => {
  loopbackNock.post('/baz', payload)
  .reply(200, {
    status: 'ok'
  })



  return index().send(payload)
    .then(res => assert.deepEquals(res, { status: 'ok' }, 'forwards body to serviceUserId'))
})

test('parse', assert => {
	return index().parse(payload)
		.then(res => assert.deepEquals(res, [ payload ], 'returns payload in an array'))
})
