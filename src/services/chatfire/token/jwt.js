const jwt = require('jsonwebtoken')

const nowSeconds = () => Math.floor(Date.now() / 1000)

module.exports.generate = config => {
  const { client_email, private_key } = config
  const now = nowSeconds()

  const payload = {
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/firebase.database',
      'https://www.googleapis.com/auth/firebase.storage',
      'https://www.googleapis.com/auth/devstorage.read_only'
    ].join(' '),
    iat: now,
    iss: client_email,
    sub: client_email,
    exp: now + 60 * 60,
    aud: 'https://www.googleapis.com/oauth2/v4/token'
  }

  return jwt.sign(payload, private_key, { algorithm: 'RS256' })
}
