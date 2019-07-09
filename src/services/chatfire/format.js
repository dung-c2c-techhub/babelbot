module.exports = ({ bot_id }) => ({ text, at }) => {
    return {
        isBot: true,
        userId: bot_id,
        body: text,
        at: at || Date.now()
    }
}
