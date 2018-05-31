
const BabelBot = require('babelbot')
const config = require('./secrets.example.json')

const babelbot = new BabelBot(config)

module.exports.handler = (event, context, callback) => {
  const {
    body,
    pathParameters,
  } = event

  const { serviceName } = pathParameters
  const parsed = JSON.parse(body)

  return babelbot.parse(serviceName, parsed)
    .then(([ res ]) => {
      if (!res) return
      res.text = "You said: " + res.text
      return babelbot.send(serviceName, res)
    })
    .then(res => {
      return callback(null, { statusCode: 200 })
    })
    .catch(callback)
}


