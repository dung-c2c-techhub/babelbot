module.exports = ({ service_user_id, text, options={} }) => {
	return Object.assign({}, options, {
        receiver: service_user_id,
        type: 'text',
        text: text,
        sender: {
            name: 'Abi'
        }
	})
}