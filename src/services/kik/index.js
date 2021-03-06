
const chunker = require('../../lib/chunker')
const parse = require('./parse')
const format = require('./format')
const makeRequest = require('./makeRequest')
const flow = require('lodash.flow')

module.exports = config => {
    const sendFunc = flow(format, makeRequest(config)('/v1/message'))

    return {
        parse,
        send: chunker(sendFunc)
    }
}