module.exports = ({ service_user_id, text, options={} }) => {
	return Object.assign({}, options, {
    chat_id: service_user_id,
    text: text,
	})
}
