'use strict'

const test = require('blue-tape')
const isPlainObject = require('lodash.isplainobject')

const token = require('../index').token

const stage = process.env.SERVERLESS_STAGE || 'test'

test(`WECHAT-'token' is a function`, t => {
  t.plan(1)
  t.equal(typeof token, 'function', 'Should be a function.')
})

test(`WECHAT-'token' returns an object`, t => {
  t.plan(1)
  t.ok(isPlainObject(token(stage)), 'Should be a javascript Object.')
})

test(`WECHAT-'token' return the necessary configuration keys for wechat`, t => {
  const config = token(stage)
  const expected = {
    appId: 'wxbe61854c143724e0',
    appSecret: 'c6c607f0fb38577550dc3c984dfcbc40',
    verifyToken: 'coolrunnings',
  }

  t.plan(1)
  t.deepEqual(config, expected, 'Should return the \'config\' for interacting with __test__.')
})
