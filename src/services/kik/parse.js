const SERVICE_NAME = 'kik'
const VALID_TYPES = ['text', 'picture']

module.exports = ({ messages }) => {
    var res = filter(messages).map(format)

    return Promise.resolve(res)
}

function filter(messages) {
    return messages.filter(m => VALID_TYPES.includes(m.type))
}

function format({ from, timestamp, body, type, picUrl }) {
    var msg = {
        timestamp,
        service_name: SERVICE_NAME,
        service_user_id: from,
    }

    if (body) msg.text = body

    if (picUrl) {
        msg.attachments = [{
            url: picUrl
        }]
    }

    return msg
}
