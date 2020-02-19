const SERVICE_NAME = 'whatsapp';
const IMAGE_MIME_TYPES = ['image/gif', 'image/jpeg', 'image/png'];

module.exports = ({
  From, Body, MediaUrl0, MediaContentType0,
}, serviceSender) => {
  const msg = {
    service_name: serviceSender ? `${SERVICE_NAME}.${serviceSender}` : SERVICE_NAME,
    service_user_id: From,
    timestamp: Date.now(),
    ...(Body && { text: Body }),
    ...(IMAGE_MIME_TYPES.includes(MediaContentType0) && MediaUrl0 && {
      attachments: [{ url: MediaUrl0 }],
    }),
  };

  return Promise.resolve([msg]);
};
