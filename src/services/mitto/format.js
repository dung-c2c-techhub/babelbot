module.exports = ( event ) => ( msg ) => {
    const { service_user_id, text } = msg
    var [phone, mask] = service_user_id.split(':')
    console.log('event X ------------------', event)
    console.log('msg ------------------', msg)
    console.log('service_user_id--------', service_user_id)
    return {
        text,
        to: phone,
        from: mask,
    }
}
