
'use strict'

const SERVICE_NAME = 'skype'
const VALID_TYPES = [ 'image', 'octet-stream' ]

module.exports = message => {
  if (message.type !== 'message') return Promise.resolve([])
  var msg = format(message)

  return Promise.resolve([ msg ])
}

function filterAttachments(attachments) {
  return attachments.filter(a => a.contentType.some(c => VALID_TYPES.includes(c)))
}


function format({ from, timestamp, text, attachments }) {
  var { id } = from

  var msg = {
    service_name: SERVICE_NAME,
    service_user_id: id,
    timestamp: new Date(timestamp).getTime(),
  }

  if (text) msg.text = text

  if (attachments) {
    msg.attachments = filterAttachments(attachments)
      .map(a => ({ url: a.contentUrl }))
  }

  return msg
}
