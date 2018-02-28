
const chunker = require('../../lib/chunker')
const parse = require('./parse')
const format = require('./format')
const makeRequest = require('./makeRequest')
const getToken = require('./token')
const flow = require('lodash.flow')

module.exports = config => {
	const { databaseUrl } = config
	
	const makeRequestAuth = url => obj => getToken(config)
		.then(token => makeRequest(token)(path)(obj))

	const sendMessage = msg => {
		const path = [ databaseUrl, msg.userId, msg.at ].join('/')
		return getToken(config)
			.then(token => makeRequest(token)(path)(msg))
	}

	const sendFunc = flow(format, sendMessage)

	return {
		parse,
		send: chunker(sendFunc)
	}
}
