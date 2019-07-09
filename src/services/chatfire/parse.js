const SERVICE_NAME = 'chatfire';

module.exports = () => async ({ userId, body, at, attachments }) => {
  const msg = {
    service_name: SERVICE_NAME,
    service_user_id: userId,
    timestamp: at,
    ...(body && { text: body }),
    ...(attachments && { attachments }),
  }

  return Promise.resolve([msg]);
}
