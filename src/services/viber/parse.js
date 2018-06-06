const SERVICE_NAME = 'viber'
const VALID_MESSAGE_TYPES = [ 'text', 'picture' ]

module.exports = (message) => {
  var res = format(message)

  return Promise.resolve(res)
}

function format ({ event, timestamp, sender, message }) {
  if (!message || !VALID_MESSAGE_TYPES.includes(message.type)) return []

  var msg = {
    timestamp,
    service_name: SERVICE_NAME,
    service_user_id: sender.id
  }

  if (message.type === 'text') {
    if (message.text) msg.text = message.text
  }

  if (message.type === 'picture') {
    msg.attachments = [{
      url: message.media
    }]
  }

  return [ msg ]
}
