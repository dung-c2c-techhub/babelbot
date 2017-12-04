const SERVICE_NAME = 'line'
const VALID_TYPES = [ 'text', 'image', 'audio' ]

module.exports = ({ channelAccessToken }) => ({ events }) => {
  var filtered = events.filter(m => m.type == 'message' && VALID_TYPES.includes(m.message.type))
  var messages = filtered.map(({ source, timestamp, message }) => {
    var { userId } = source
    var { id, text, type } = message
    var msg = {
      timestamp,
      service_name: SERVICE_NAME,
      service_user_id: userId,
    }

    if (text) msg.text = text

    if (type !== 'text') {
      msg.attachments = [{
        url: `https://api.line.me/v2/bot/message/${id}/content`,
        options: {
          headers: {
            'Authorization': `Bearer ${channelAccessToken}`
          }  
        }
      }]
    }
    return msg    
  })

  return Promise.resolve(messages)
}