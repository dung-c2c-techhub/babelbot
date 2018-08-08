'use strict'

const getAttachmentUrl = require('./getAttachmentUrl')
const SERVICE_NAME = 'telegram'
const byFileSize = (a, b) => b.file_size - a.file_size

const IMAGE_MIME_TYPES = ['image/gif', 'image/jpeg', 'image/png']

module.exports = config => async ({ message }) => {
  // return empty if not a messaage
  if (!message) return []

  var { from, text, date } = message
  var file_id = getFileId(message)
  // return empty if no text and no image (either in photo or document attrs)
  if (!text && !file_id) return []

  var msg = {
    service_name: SERVICE_NAME,
    service_user_id: from.id.toString(),
    timestamp: date * 1000,
  }
  
  if (text) {
    if (text.startsWith('/start')) {
      const [ msgText, msgReferral ] = text.split(' ')
      msg.referral = msgReferral
      msg.text = msgText
    } else {
      msg.text = text
    }
  }

  if (file_id) {
    var url = await getAttachmentUrl(config)(file_id)
    msg.attachments = [{ url }]
  }

  return [ msg ]
}


// given a message, look for image in photo and document fields
function getFileId( { photo = [], document = {} }) {
  if (photo.length > 0) {
    return photo.sort(byFileSize)[0].file_id
  } else if (IMAGE_MIME_TYPES.includes(document.mime_type)) {
    return document.file_id
  }
}