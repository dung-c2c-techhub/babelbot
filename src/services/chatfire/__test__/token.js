const { test } = require('tap')
const nock = require('nock')
const proxyquire = require('proxyquire')
const token = proxyquire('../token', {
	jsonwebtoken: {
		sign: (payload, key, options) => JSON.stringify({ payload, key, options }),
		decode: payload => payload,
	}
})

const config = {
	authUrl: 'https://auth.bar.baz/foo',
	privateKey: 'foobar',
	partnerUserId: '123456',
	partnerName: 'test_partner',
}

const tokenNock = nock('https://auth.bar.baz')

test('token', assert => {
	tokenNock.get('/foo')
	.query({
		token: JSON.stringify({
			payload: {
				partnerUserId: '123456',
			},
			key: 'foobar',
			options: {
				issuer: 'test_partner',
			}
		})
	})
  .reply(200, {
    token: 'fooToken',
  })

	return token(config)
		.then(res => {
			assert.equal(res, 'fooToken', 'returns token')
			return token(config)
		})
		.then(res => assert.equal(res, 'fooToken', 'uses token from cache'))
})