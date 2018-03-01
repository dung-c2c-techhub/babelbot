const { test } = require('tap')
const proxyquire = require('proxyquire')

const defaultStubs = {
	'jsonwebtoken': {
		sign: (payload, key, options) => ({ payload, key, options }),
	}
}

const jwt = proxyquire('../jwt', defaultStubs)

test('generates token', assert => {
	assert.plan(1)

	const config = {
		client_email: 'foobar@email.com',
		private_key: 'foobar_key',
	}

	const expected = {
		key: 'foobar_key',
		options: { 
			algorithm: 'RS256',
		},
		payload: {
			scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/firebase.database',
			iat: /\d+/,
			exp: /\d+/,
			iss: 'foobar@email.com',
			sub: 'foobar@email.com',
			aud: "https://www.googleapis.com/oauth2/v4/token",
		},
	}

	var res = jwt.generate(config)
	assert.match(res, expected, 'returns signed token')
})