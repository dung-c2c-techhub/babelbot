const SERVICE_NAME = 'whatsapp'

module.exports = (parseEvent) => {
    const { From, Body } = parseEvent
    const msg = {
        service_name: SERVICE_NAME,
        service_user_id: From,
        text: Body,
        timestamp: Date.now(),
    }

    return Promise.resolve([msg])
}
