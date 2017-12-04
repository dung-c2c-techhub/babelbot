const fetch = require('node-fetch')
const baseUrl = 'https://skype.botframework.com'

module.exports = token => path => body => {
	return fetch(baseUrl + path, {
		body: JSON.stringify(body),
		method: 'POST',
	  headers: {
	    Authorization: `Basic ${token}`,
	    'Content-Type': 'application/json; charset=utf-8',
	  },
	})
	.then(res => res.json())
}