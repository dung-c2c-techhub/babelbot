const crypto = require('crypto');

module.exports = ({ verifyToken }) => ({ echostr, nonce, signature, timestamp }) => {
  const sha1Str = crypto
    .createHash('sha1')
    .update([verifyToken, timestamp, nonce].sort().join(''))
    .digest('hex');

  if (sha1Str === signature) {
    return Promise.resolve(echostr)
  }

  return Promise.reject(new Error(`Couldn't verify token`));
}
