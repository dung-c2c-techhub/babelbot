
const chunker = require('../../lib/chunker')
const parse = require('./parse')
const format = require('./format')
const makeRequest = require('./makeRequest')
const getToken = require('./token')

module.exports = config => {
	const formatter = format(config)

	const getPath = msg => `/messages/${msg.service_user_id}/${Date.now()}.json`

	const makeRequestAuth = path => obj => getToken(config)
		.then(token => makeRequest(token)(path)(obj))

	const sendFunc = msg => {
		const path = getPath(msg)
	 	const formatted = formatter(msg)
	 	const sendMessage = makeRequestAuth(path)
	 	
	 	return sendMessage(formatted)
	}

	return {
		parse: parse(config),
		send: chunker(sendFunc),
	}
}