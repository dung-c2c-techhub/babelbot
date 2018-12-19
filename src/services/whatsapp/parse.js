const SERVICE_NAME = 'whatsapp'
const VALID_MESSAGE_TYPES = ['text', 'picture']

module.exports = (message) => {
    var res = format(message)

    return Promise.resolve(res)
}

function format(message) {
    //if (!message || !VALID_MESSAGE_TYPES.includes(message.type)) return []
    let timestamp = new Date().getTime()
    
    var msg = {
        timestamp,
        service_name: SERVICE_NAME,
        service_user_id: message.From
    }

    if (message.NumMedia === '0') {
        if (message.Body) msg.text = message.Body
    }

    /*if (message.type === 'picture') {
        msg.attachments = [{
            url: message.media
        }]
    }*/
    console.log(msg)
    return [msg]
}
