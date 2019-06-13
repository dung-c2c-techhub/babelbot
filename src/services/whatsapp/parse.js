const SERVICE_NAME = 'whatsapp'

module.exports = ({ From, Body, Timestamp }) => {
    var msg = {
        service_name: SERVICE_NAME,
        service_user_id: From,
        text: Body,
        timestamp: Timestamp ? parseInt(Timestamp) : Date.now(),
    }

    return Promise.resolve([msg])
}
