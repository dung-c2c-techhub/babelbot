const token = require('./token')

const SERVICE_NAME = 'skype'
const VALID_TYPES = [ 'image', 'octet-stream' ]

module.exports = config => message => {
  if (message.type !== 'message') return Promise.resolve([])

  return format(config)(message)
    .then(res => [ res ])

  return Promise.resolve([ msg ])
}

function filterAttachments(attachments) {
  return attachments.filter(a => VALID_TYPES.includes(a.contentType))
}


function format(config) {
  return ({ from, timestamp, text, attachments }) => {
    var { id } = from

    var msg = {
      service_name: SERVICE_NAME,
      service_user_id: id,
      timestamp: new Date(timestamp).getTime(),
    }

    if (text) msg.text = text

    if (attachments) {
      return token(config)
        .then(authToken => {
          return Object.assign({}, msg, {
            attachments: filterAttachments(attachments)
              .map(a => ({
                url: a.contentUrl,
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
}
