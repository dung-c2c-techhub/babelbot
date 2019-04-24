module.exports = ( event ) => ( msg ) => {
    
    console.log('format - event', event)
    console.log('format - msg', msg) 
    var [phone, mask] = service_user_id.split(':')

    return {    
        text,  
        to: phone,        
        from: mask,        
    }
}
