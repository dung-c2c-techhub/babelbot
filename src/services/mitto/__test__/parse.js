const { test } = require('tap')
const parse = require('../parse')


test('should parse a single message from query', t => {
  var msg ={
    receiver: 'short123',
    sender: '123456789',
    content: 'Hello, world!',    
  }

  var expected = [{
    service_name: 'mitto',
    service_user_id: '123456789:short123',
    text: 'Hello, world!',
    timestamp:  Date.now(),
  }]

  return parse(msg)
    .then(response => t.deepEqual(response, expected))
})