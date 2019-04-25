const SERVICE_NAME = 'mitto'

module.exports = (event) => {
    
    console.log('parse', event)
    
    const { from, message, timestamp } = event
    var msg = {
        service_name: SERVICE_NAME,
        service_user_id: from,
        text: message,
        timestamp: timestamp ? parseInt(timestamp) : Date.now(),
    }

    return Promise.resolve([msg])
}
