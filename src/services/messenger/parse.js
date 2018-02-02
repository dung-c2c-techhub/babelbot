const SERVICE_NAME = 'messenger'
const VALID_TYPES = [ 'image', 'audio' ]

module.exports = ({ entry }) => {
  var messages = entry
    .reduce((p, c) => p.concat(c.messaging || []), [])
    .map(format)
  
  return Promise.resolve(messages)
}

function filterAttachments(attachments) {
  return attachments.filter(a => VALID_TYPES.includes(a.type))
}

function format({ sender={}, message={}, postback={}, timestamp, referral }) {
  var { id } = sender
  var { text, attachments } = message

  var msg = {
    timestamp,
    service_name: SERVICE_NAME,
    service_user_id: id,
  }

  if (text) msg.text = text

  if (attachments) {
    msg.attachments = filterAttachments(attachments)
      .map(a => ({ url: a.payload.url }))
  }

  var referral = referral || postback.referral
  
  if (referral) msg.referral = referral.ref

  return msg
}