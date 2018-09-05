const fetch = require('../../lib/fetch')
const qs = require('querystring')
const baseUrl = 'https://relay.uk.oxygen8.com'

module.exports = ({ username, password, targetUrl }) => body => {
	const token = Buffer.from(`${username}:${password}`).toString('base64')

	return fetch(baseUrl + targetUrl, {
		body: qs.stringify(body),
		method: 'POST',
	  headers: {
	    Authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
	  },
	})
}