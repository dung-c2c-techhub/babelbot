const SERVICE_NAME = 'whatsapp'

module.exports = ({ From, Body, MediaUrl0, MediaContentType0 }) => {
    const msg = {
        service_name: SERVICE_NAME,
        service_user_id: From,
        timestamp: Date.now(),
    };

    if (MediaContentType0 && MediaContentType0.includes('image') && MediaUrl0) {
        msg.attachments = [{ url: MediaUrl0 }];
    } else {
        msg.text = Body;
    }

    return Promise.resolve([msg]);
}
