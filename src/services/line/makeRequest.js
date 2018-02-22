const fetch = require('../../lib/fetch')
const baseUrl = 'https://api.line.me'

module.exports = ({ channelAccessToken }) => path => body => {
	return fetch(baseUrl + path, {
		body: JSON.stringify(body),
		method: 'POST',
	  headers: {
	    Authorization: `Bearer ${channelAccessToken}`,
	    'Content-Type': 'application/json',
	  },
	})
	.catch(error => {
		var parsed = JSON.parse(error)
		throw new Error(parsed.message)
	})
}