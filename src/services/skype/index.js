
const chunker = require('../../lib/chunker')
const parse = require('./parse')
const format = require('./format')
const makeRequest = require('./makeRequest')
const getToken = require('./token')
const flow = require('lodash.flow')

const pflow = function () {
    return params => Array.from(arguments).reduce((p, c) => p.then(c), Promise.resolve(params))
}

module.exports = config => {

    const makeRequestAuth = path => obj => getToken(config)
        .then(token => makeRequest(token)(path)(obj))

    const getConversationPath = pflow(
        format.conversation(config),
        makeRequestAuth('/v3/conversations'),
        ({ id }) => `/v3/conversations/${id}/activities`
    )

    const sendMessage = msg => getConversationPath(msg)
        .then(makeRequestAuth)
        .then(f => f(msg))

    const sendFunc = flow(format.message, sendMessage)

    return {
        parse: parse(config),
        send: chunker(sendFunc)
    }
}
