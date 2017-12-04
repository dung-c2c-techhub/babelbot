const fetch = require('node-fetch')
const baseUrl = 'https://api.line.me'

module.exports = ({ channelAccessToken }) => path => body => {
	
	return fetch(baseUrl + path, {
		body: JSON.stringify(body),
		method: 'POST',
	  headers: {
	    Authorization: `Basic ${channelAccessToken}`,
	    'Content-Type': 'application/json',
	  },
	})
	.then(res => res.json())
}