module.exports.message = ({ service_user_id, text }) => {
	return {
	  to: service_user_id,
	  messages: [{
	    text: text,
	    type: 'text'
	  }]
	}
}

module.exports.conversation = ({ botId, botName }) => ({ service_user_id }) => {
	return {
		bot: {
	    id: botId,
	    name: botName,
	  },
	  members: [{
	    id: service_user_id,
	  }],
	 }		
}