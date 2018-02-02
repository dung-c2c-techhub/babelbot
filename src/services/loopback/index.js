
const chunker = require('../../lib/chunker')
const fetch = require('../../lib/fetch')
const service_name = 'loopback'

module.exports = config => {
	const sendFunc = body => fetch(body.service_user_id, {
			body: JSON.stringify(body),
			method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		  },
		})
	
	return {
		parse: p => {
			var parsed = Object.assign({}, p, {
				service_name,
				timestamp: p.timestamp || Date.now(),
			})

			return Promise.resolve([ parsed ])
		},
		send: chunker(sendFunc),
	}
}