const fetch = require('../../lib/fetch')
const qs = require('querystring')

const baseUrl = 'https://api.twilio.com'

module.exports = ({ apiKeySid, apiKeySecret, accountSid }) => path => body => {
	const token = new Buffer(`${apiKeySid}:${apiKeySecret}`).toString('base64')
	const url = baseUrl + '/2010-04-01/Accounts/' + accountSid
	
	return fetch(url + path, {
		body: qs.stringify(body),
		method: 'POST',
	  headers: {
	    Authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
	  },
	})
}