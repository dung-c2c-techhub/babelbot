module.exports = ({ bot_id }) => ({ text }) => {
    return {
        isBot: true,
        userId: bot_id,
        body: text,
        at: Date.now()
    }
}
