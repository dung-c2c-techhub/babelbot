const fetch = require('../../lib/fetch')
const baseUrl = 'https://api.kik.com'

module.exports = ({ username, apiKey }) => path => body => {
	const token = new Buffer(`${username}:${apiKey}`).toString('base64')
	
	return fetch(baseUrl + path, {
		body: JSON.stringify(body),
		method: 'POST',
	  headers: {
	    Authorization: `Basic ${token}`,
	    'Content-Type': 'application/json',
	  },
	})	
	.catch(error => {
		var parsed = JSON.parse(error)
		throw new Error(parsed.error)
	})
}