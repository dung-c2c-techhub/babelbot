module.exports = ({ messagingServiceSid }) => ({ service_user_id, text, alphaId }) => {

  return alphaId
    ? {
      To: service_user_id,
      From: alphaId,
      MessagingServiceSid: messagingServiceSid,
      Body: text
    }
    : {
      To: service_user_id,
      MessagingServiceSid: messagingServiceSid,
      Body: text
    }
}
