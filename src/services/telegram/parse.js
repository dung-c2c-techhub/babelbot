'use strict'

const getAttachmentUrl = require('./getAttachmentUrl')
const SERVICE_NAME = 'telegram'
const byFileSize = (a, b) => b.file_size - a.file_size

module.exports = config => ({ message }) => {
  var { from, text, date, photo } = message  
  if (!text && !photo) return Promise.resolve([])

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

  if (Array.isArray(photo)) {
    var { file_id } = photo.sort(byFileSize)[0]
    return getAttachmentUrl(config)(file_id)
      .then(url => {
        msg.attachments = [{ url }]
        return [ msg ]
      })
  }

  return Promise.resolve([ msg ])
}