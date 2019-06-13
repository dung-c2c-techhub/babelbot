module.exports = ({ from }) => ({ service_user_id, text }) => {
    return {
        from, 
        to: service_user_id,
        body: text,
    }
}