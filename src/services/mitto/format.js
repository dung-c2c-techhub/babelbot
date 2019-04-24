module.exports = ({ messagingServiceSid }) => ({ service_user_id, text }) => {
    return {
        To: service_user_id,
        MessagingServiceSid: messagingServiceSid,
        Body: text
    }
}
