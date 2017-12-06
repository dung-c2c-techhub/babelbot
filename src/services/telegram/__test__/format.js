const test = require('tap').test
const format = require('../format')

test('should format a single text message', assert => {
  const msg = {
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
  }

  const expected = {
    chat_id: 'yonah_forst',
    text: 'Hello abi',
  }
  
  assert.plan(1)
  assert.deepEqual(format(msg), expected)
})


test('should format a single text message with buttons', assert => {
  const msg = {
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
    buttons: [ 'foo', 'bar' ],
  }

  const expected = {
    chat_id: 'yonah_forst',
    text: 'Hello abi',
    reply_markup: {
      one_time_keyboard: true,
      keyboard: [
        [{ text: 'foo' }],
        [{ text: 'bar' }],
      ],
    }
  }
  
  assert.plan(1)
  assert.deepEqual(format(msg), expected)
})

test('should format merge sent options', assert => {
  const msg = {
    service_user_id: 'yonah_forst',
    text: 'Hello abi',
    buttons: [ 'foo', 'bar' ],
    options: {
      reply_markup: {
        foo: 'bar',
      },
    },
  }

  const expected = {
    chat_id: 'yonah_forst',
    text: 'Hello abi',
    reply_markup: {
      foo: 'bar',
      one_time_keyboard: true,
      keyboard: [
        [{ text: 'foo' }],
        [{ text: 'bar' }],
      ],
    }
  }
  
  assert.plan(1)
  assert.deepEqual(format(msg), expected)
})