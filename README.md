# BabelBot

Understand (and speak) any bot language, instantly!

### Minimal example [(Serverless)](https://serverless.com)
```js

const BabelBot = require('babelbot')
const config = require('./secrets.example.json')

const bablebot = new BabelBot(config)

module.exports.handler = (event, context, callback) => {
  const {
    body,
    pathParameters,
  } = event

  const { serviceName } = pathParameters
  const parsed = JSON.parse(body)

  return bablebot.parse(serviceName, parsed)
    .then(res => {
      res.text = "You said: " + res.text
      return bablebot.send(serviceName, res)
    })
    .then(() => callback(null, { statusCode: 200 }))
    .catch(callback)
}
```
