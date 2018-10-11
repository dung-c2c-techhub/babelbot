module.exports = ({ defaultMask }) => ({ service_user_id, text }) => {
    var [phone, mask = defaultMask] = service_user_id.split(':')

    return {
        MSISDN: phone,
        Content: text,
        Channel: 'BULK',
        Mask: mask,
        Multipart: '1',
    }
}
