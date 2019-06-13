module.exports = (event) => (msg) => {
    console.log('format event---- >', event)
    console.log('format msg ---- >', msg)
    const { service_user_id, text } = msg
    return {
        To: service_user_id,
        MessagingServiceSid: messagingServiceSid,
        Body: text,

    }
}