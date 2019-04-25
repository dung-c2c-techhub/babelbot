const SERVICE_NAME = 'mitto'

module.exports = (event) => {
    console.log(event)
    const { From, Body, Timestamp } = event
    var msg = {
        service_name: SERVICE_NAME,
        service_user_id: From,
        text: Body,
        timestamp: Timestamp ? parseInt(Timestamp) : Date.now(),
    }

    return Promise.resolve([msg])
}
