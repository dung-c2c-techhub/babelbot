const fetch = require('../../lib/fetch')
const baseUrl = 'https://skype.botframework.com'

module.exports = token => path => body => {
	return fetch(baseUrl + path, {
		body: JSON.stringify(body),
		method: 'POST',
	  headers: {
	    Authorization: `Bearer ${token}`,
	    'Content-Type': 'application/json; charset=utf-8',
	  },
	})
	.catch(error => {
		var parsed = JSON.parse(error)
		throw new Error(parsed.error_description)
	})
}
