const { test } = require('tap')
const nock = require('nock')
const proxyquire = require('proxyquire')
const token = proxyquire('../token', {
	jsonwebtoken: {
		decode: payload => payload,
	}
})

const config = {
	authUrl: 'https://auth.bar.baz/foo',
	token: 'foobar_token',
	partnerUserId: '123456',
}

const tokenNock = nock('https://auth.bar.baz')

test('token', assert => {
	tokenNock.get('/foo')
	.query({ token: 'foobar_token' })
  .reply(200, {
    token: 'firebaseToken',
  })

	return token(config)
		.then(res => {
			assert.equal(res, 'firebaseToken', 'returns token')
			return token(config)
		})
		.then(res => assert.equal(res, 'firebaseToken', 'uses token from cache'))
})