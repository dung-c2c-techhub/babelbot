const jwt = require('./jwt')
const cache = require('./cache')
const makeRequest = require('./makeRequest')

module.exports = config => {
	const { project_id } = config
	var access_token = cache.get(project_id)

	if (access_token) return Promise.resolve({ access_token, project_id })

	// if the access token is no longer valid
	return makeRequest({
			assertion: jwt.generate(config),
			grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
		})
		.then(({ access_token, expires_in }) => {
				//update the cache
				cache.set(project_id, access_token, expires_in)

				return { access_token, project_id }
			})
}