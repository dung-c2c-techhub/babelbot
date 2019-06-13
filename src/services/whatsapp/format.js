module.exports = (config) => ({ service_user_id, text }) => {
    console.log('config---->', config);
    const { from } = config;
    return {
        From: from, 
        To: service_user_id,
        Body: text,
    }
}