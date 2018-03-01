//cache
var TOKEN = {}

const nowSeconds = () => Math.floor(Date.now() / 1000)

module.exports.get = project_id => {
	const { accessToken, expiresAt } = TOKEN[project_id] || {}

	// dont return anything if the cached token is no longer valid
	if (expiresAt <= nowSeconds()) return
	
	return accessToken
}

module.exports.set = (project_id, accessToken, expiresIn) => {
	TOKEN[project_id] = {
		accessToken,
		expiresAt: nowSeconds() + expiresIn,
	}
}