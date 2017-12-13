
const chunker = require('../../lib/chunker')
const fetch = require('../../lib/fetch')

module.exports = config => {
	const sendFunc = body => fetch(body.serviceUserId, {
			body: JSON.stringify(body),
			method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		  },
		})
	
	return {
		parse: p => Promise.resolve([ p ]),
		send: chunker(sendFunc),
	}
}