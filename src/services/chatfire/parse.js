const getToken = require('./token')

const SERVICE_NAME = 'chatfire'

module.exports = config => ({ userId, body, at, attachments }) => {
	const msg = {
    service_name: SERVICE_NAME,
    service_user_id: userId,
    timestamp: at
  }

  if (body) msg.text = body

  if (attachments) {
    return getToken(config)
      .then(authToken => {
        return Object.assign({}, msg, {
          attachments: attachments.map(a => ({
            url: a.url,
            options: {
              headers: {
                'Authorization': `Bearer ${authToken}`,
              },
            },
          }))
        })
      })
  }

  return Promise.resolve(msg)
}