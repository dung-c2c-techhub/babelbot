module.exports = ({ service_user_id, text, buttons }) => {
	var msg = {
    chat_id: service_user_id,
    text: text
	}

	if (buttons)
		msg.reply_markup = {
    	keyboard: buttons.map(text => [{ text }]),
    	one_time_keyboard: true,
    }

   return msg
}
