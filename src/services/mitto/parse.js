const SERVICE_NAME = 'mitto'

module.exports = (event) => {
    const { receiver, content } = event
    var msg = {
        service_name: SERVICE_NAME,
        service_user_id: receiver,
        text: content,
        timestamp: Date.now(),
    }

    return Promise.resolve([msg])
}
