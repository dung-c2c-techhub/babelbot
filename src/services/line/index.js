
const chunker = require('../../lib/chunker')
const parse = require('./parse')
const format = require('./format')
const makeRequest = require('./makeRequest')
const flow = require('lodash.flow')

module.exports = config => {
    const sendFunc = flow(format, makeRequest(config)('/v2/bot/message/push'))

    return {
        parse: parse(config),
        send: chunker(sendFunc)
    }
}