# BabelBot

Understand (and speak) any bot language, instantly!

### Minimal example (aws lambda)
```js

const BabelBot = require('babelbot')
const config = require('./secrets.example.json')

const babelbot = new BabelBot(config)

module.exports.handler = (event, context, callback) => {
  const {
    body,
    pathParameters,
  } = event

  const { serviceName } = pathParameters
  const obj = JSON.parse(body)

  return babelbot.parse(serviceName, obj)
    .then(res => {
      res.text = "You said: " + res.text
      return babelbot.send(serviceName, res)
    })
    .then(() => callback(null, { statusCode: 200 }))
    .catch(callback)
}
```
