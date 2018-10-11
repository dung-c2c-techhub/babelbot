'use strict'

const sender = require('./sender')
const receiver = require('./receiver')

module.exports = {
    sender,
    receiver,
    token: require('./token'),
}
