module.exports = ({ service_user_id, text, options={} }) => {
    buttonConfig = options.buttonConfig
    delete options.buttonConfig
	return Object.assign({}, options, buttonConfig, {
    chat_id: service_user_id,
    text: text,
	})
}
