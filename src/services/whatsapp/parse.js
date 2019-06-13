const SERVICE_NAME = 'whatsapp'

module.exports = ({parseEvent}) => {
    console.log('parseEvent---->',parseEvent)
    const { from, timestamp, body } = parseEvent
    var msg = {
        service_name: SERVICE_NAME,
        service_user_id: from,
        text: body,
        timestamp: timestamp ? parseInt(timestamp) : Date.now(),
    }

    return Promise.resolve([msg])
}
