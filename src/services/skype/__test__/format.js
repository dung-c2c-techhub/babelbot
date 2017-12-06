const test = require('tap').test
const format = require('../format')

test('should format a single text message', assert => {
  const msg = {
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
  }

  const expected = {
    recipient: {
      id: 'yonah_forst'
    },
    text: 'Hello abi',
    type: 'message',
  }

  assert.plan(1)
  assert.deepEqual(format.message(msg), expected)
})


test('should format a conversation request', assert => {
  const config = {
    bot: {
      id: 'foo',
      name: 'bar',
    }
  }

  const msg = {
    recipient: {
      id: 'yonah_forst'
    },
    text: 'Hello abi',
    type: 'message',
  }

  const expected = {
    bot: {
      id: 'foo',
      name: 'bar',
    },
    members: [{
      id: 'yonah_forst',
    }],
  }

  assert.plan(1)
  assert.deepEqual(format.conversation(config)(msg), expected)
})
