const SERVICE_NAME = 'whatsapp'

module.exports = (parseEvent) => {
    console.log('parseEvent---->',parseEvent)
    const { From, Body } = parseEvent
    var msg = {
        service_name: SERVICE_NAME,
        service_user_id: From,
        text: Body,
        timestamp: Date.now(),
    }

    return Promise.resolve([msg])
}
