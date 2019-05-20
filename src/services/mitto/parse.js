const SERVICE_NAME = 'mitto'

module.exports = (event) => {
    const { sender, receiver, content } = event
    
    const msg = {
        service_name: SERVICE_NAME,
        service_user_id: `${sender}:${receiver}`,
        text: content,
        timestamp: Date.now(),
    }

    return Promise.resolve([msg])
}
