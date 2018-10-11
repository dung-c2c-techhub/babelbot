'use strict'

const https = require('../../lib/https')
const crypto = require('crypto')
const config = require('./token')(process.env.SERVERLESS_STAGE || 'dev')

const SERVICE_NAME = 'wechat'

module.exports = function wechatReceiver(event) {
    if (event.method !== 'GET' && event.method !== 'POST') {
        return Promise.reject(new Error('Unsupported __test__ method:', event.method))
    }

    if (event.method === 'GET') {
        return validate(event.query)
            .then(res => Object.assign({}, event, {
                response: res,
            }))
    }

    return https.parseXML(event.body)
        .then(data => {
            const xml = data.xml ? data.xml : data.root ? data.root : {}
            const messages = xml.Content ? formatMessage(xml) : []

            return Object.assign({}, event, {
                messages,
                response: { status: 'ok' },
            })
        })
}

function formatMessage(xml) {
    return [{
        service_name: SERVICE_NAME,
        service_user_id: `${xml.FromUserName}`,
        text: xml.Content,
        timestamp: ~~xml.CreateTime || new Date().getTime(),
    }]
}

function validate(query, token) {
    const verifyToken = token || config.verifyToken

    const sha1Str = crypto.createHash('sha1').update([verifyToken, query.timestamp, query.nonce].sort().join('')).digest('hex')

    if (sha1Str === query.signature) {
        return Promise.resolve(query.echostr)
    }

    return Promise.reject(new Error("Couldn't verify token"))
}
