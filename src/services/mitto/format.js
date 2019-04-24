module.exports = ({ defaultMask } ) => ({ service_user_id, text }) => {
    
    console.log('defaultMask', defaultMask)
    var [phone, mask = defaultMask] = service_user_id.split(':')
    return {      
        to: phone,        
        from: mask,        
    }
}
