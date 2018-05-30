
const chunker = require('../../lib/chunker')
const parse = require('./parse')
const format = require('./format')
const makeRequest = require('./makeRequest')
const flow = require('lodash.flow')

module.exports = config => {
	const sendFunc = flow(format, makeRequest(config)('/send_message'))

	return {
		parse: parse,
		send: chunker(sendFunc, config)
	}
}