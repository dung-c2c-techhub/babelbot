const fetch = require('node-fetch')
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
	.then(res => res.json())
}