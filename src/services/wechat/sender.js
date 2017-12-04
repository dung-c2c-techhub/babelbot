'use strict'

const https = require('../../lib/https')
const utils = require('../../lib/utils')
const config = require('./token')(process.env.SERVERLESS_STAGE || 'dev')

let TOKEN

module.exports = function wechatSender(serviceUserId, message) {
  const send = sendWechatMessage.bind(null, serviceUserId)
  let messages = utils.chunk(message, 300)

  if (messages.length === 1) {
    return send(messages[0])
  }

  const last = messages.slice(-1)
  messages = messages.slice(0, -1)

  return utils.chainPromiseWithArguments(send, messages, utils.calcuatePauseForText)
    .then(() => send(last[0]))
}

function sendWechatMessage(userId, message) {
  const body = {
    touser: userId,
    msgtype: 'text',
    text: {
      content: message,
    },
  }

  return makeWechatRequest('/send', body)
}

function makeWechatRequest(endpoint, body) {
  const stringBody = JSON.stringify(body)
  let options = {
    path: `/cgi-bin/message/custom${endpoint}?access_token=`,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (TOKEN && TOKEN.length) {
    options = Object.assign({}, options, { path: options.path + TOKEN })
    return makeRequest(options, stringBody)
  }

  return getAccessToken()
    .then(response => response.json())
    .then(json => {
      TOKEN = json.access_token
      options = Object.assign({}, options, { path: options.path + TOKEN })

      return makeRequest(options, stringBody)
    })
}

module.exports.getAccessToken = getAccessToken
function getAccessToken() {
  return makeRequest({
    method: 'GET',
    path: `/cgi-bin/token?grant_type=client_credential&appid=${config.appId}&secret=${config.appSecret}`,
  }, '')
}

function makeRequest(options, stringBody) {
  const requestConfig = Object.assign({}, {
    method: 'POST',
    host: 'api.wechat.com',
  }, options)

  return https.request(requestConfig, stringBody)
    .then(response => response)
    .catch(e => {
      let message = e.message
      if (e.error && e.error.message) message = e.error.message
      throw new Error(message)
    })
}
