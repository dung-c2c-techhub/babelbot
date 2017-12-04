module.exports = ({ service_user_id, text }) => {
	return {
	  to: service_user_id,
	  messages: [{
	    text: text,
	    type: 'text'
	  }]
	}
}
