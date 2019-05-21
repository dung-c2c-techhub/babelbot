module.exports = ( event ) => ( msg ) => {
    const { service_user_id, text } = msg
    var [phone, mask] = service_user_id.split(':')
   
    return {
        text,
        to: phone,
        from: mask,
    }
}
