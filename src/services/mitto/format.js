module.exports = ( event ) => ( msg ) => {
    console.log('format', event)
    const { service_user_id, text } = msg
    var [phone, mask] = service_user_id.split(':')

    return {
        text,
        to: `+${phone}`,
        from: mask,
    }
}
