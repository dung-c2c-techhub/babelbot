const { test } = require('tap')
const nock = require('nock')
const token = require('../token')

const tokenNock = nock('https://login.microsoftonline.com')

test('token', assert => {
	 tokenNock.post('/botframework.com/oauth2/v2.0/token', {
    grant_type: 'client_credentials',
    client_id: 'foo',
    client_secret: 'bar',
    scope: 'https://api.botframework.com/.default',
  })
  .reply(200, {
    access_token: 'fooToken',
    expires_in: 100,
  })

	const config = {
		appId: 'foo',
		appPassword: 'bar',
	}

	return token(config)
		.then(res => {
			assert.equal(res, 'fooToken', 'returns token')
			return token(config)
		})
		.then(res => assert.equal(res, 'fooToken', 'uses token from cache'))

})
