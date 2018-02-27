module.exports = ({ service_user_id, text }) => {
	return {
		userId: service_user_id,
		body: text,
		at: Date.now(),
	}
}