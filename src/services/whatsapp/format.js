module.exports = (config) => ({ service_user_id, text }) => {
    console.log('config---->', config)
    const {from} = config
    return {
        from, 
        to: service_user_id,
        body: text,
    }
}