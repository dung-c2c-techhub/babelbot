module.exports = ({ from }) => ({ service_user_id, text }) => {
    return {
        To: service_user_id,
        From: "whatsapp:" + from,
        Body: text
    }
}
