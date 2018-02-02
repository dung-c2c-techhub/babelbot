const fetch = require('../../lib/fetch')
const qs = require('querystring')
const baseUrl = 'https://relay.uk.oxygen8.com'

module.exports = ({ username, passsword, targetUrl }) => body => {
	const token = new Buffer(`${username}:${passsword}`).toString('base64')

	return fetch(baseUrl + targetUrl, {
		body: qs.stringify(body),
		method: 'POST',
	  headers: {
	    Authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
	  },
	})
}