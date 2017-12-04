'use strict'

const test = require('blue-tape')
const wechat = require('../index')

test('WECHAT-validate(): validates if token is correct', assert => {
  const event = {
    method: 'GET',
    query: {
      'signature': '233d0bf51d99b60b5c77af8f0602335393b40ddf',
      'timestamp': '1234567890',
      'nonce': '987654321',
      'echostr': 'somecrazyrandomstring',
    },
  }

  const expected = Object.assign({}, event, {
    response: 'somecrazyrandomstring',
  })

  return wechat.receiver(event)
    .then(res => assert.deepEqual(res, expected))
})

test('WECHAT-validate(): does not validate if token is incorrect', assert => {
  const event = {
    method: 'GET',
    query: {
      'signature': 'ijsodifjsiodjfoisdjfiosdjfoi',
      'timestamp': '1234567890',
      'nonce': '987654321',
      'echostr': 'somecrazyrandomstring',
    },
  }

  const promise = wechat.receiver(event)
  return assert.shouldFail(promise)
})
