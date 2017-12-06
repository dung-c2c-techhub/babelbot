module.exports.message = ({ service_user_id, text }) => {
	return {
    recipient: {
      id: service_user_id,
    },
    text,
    type: 'message',
	}
}

module.exports.conversation = ({ bot }) => ({ recipient }) => {
	return {
		bot,
	  members: [ recipient ],
	 }
}
