module.exports = ({ service_user_id, text }) => {
  return {
  	messaging_type: 'RESPONSE',
    recipient: {
      id: service_user_id,
    },
    message: {
      text: text,
    },
  }
}
