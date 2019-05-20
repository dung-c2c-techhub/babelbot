const SERVICE_NAME = 'mitto'

module.exports = (event) => {
    const { receiver, content } = event
    console.log('receiver parse------------>', event)
    var msg = {
        service_name: SERVICE_NAME,
        service_user_id: receiver,
        text: content,
        timestamp: Date.now(),
    }
    console.log('receiver parse------------>', msg)

    return Promise.resolve([msg])
}
