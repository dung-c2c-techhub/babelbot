module.exports = ({ service_user_id, text, buttons, options={} }) => {
	var msg = Object.assign({}, {
    chat_id: service_user_id,
    text: text
	}, options)

	if (buttons) {
    msg.reply_markup = Object.assign({}, {
      keyboard: buttons.map(({ title }) => [{ text: title }]),
      one_time_keyboard: true,
      resize_keyboard: true,      
    }, msg.reply_markup)    
  }

  return msg
}
