const SERVICE_NAME = 'whatsapp';
const IMAGE_MIME_TYPES = ['image/gif', 'image/jpeg', 'image/png'];

module.exports = ({ From, Body, MediaUrl0, MediaContentType0 }) => {
    const msg = {
        service_name: SERVICE_NAME,
        service_user_id: From,
        timestamp: Date.now(),
    };

    if (IMAGE_MIME_TYPES.includes(MediaContentType0) && MediaUrl0) {
        msg.attachments = [{ url: MediaUrl0 }];
    } else {
        msg.text = Body;
    }

    return Promise.resolve([msg]);
}
