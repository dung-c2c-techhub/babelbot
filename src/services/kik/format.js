module.exports = ({ service_user_id, text }) => {
	return {
    messages: [{
      to: service_user_id,
      body: text,
      type: 'text',
    }],
  }
}
