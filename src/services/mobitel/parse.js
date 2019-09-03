const SERVICE_NAME = 'nexmo';
const VALID_MESSAGE_TYPES = ['text'];

module.exports = () => async (message) => {
  const { to = '', text = '', type = '' } = message;
  if (!text || !VALID_MESSAGE_TYPES.includes(type)) return [];
  const msg = {
    timestamp: message['message-timestamp']
      ? new Date(message['message-timestamp']).getTime()
      : new Date(),
    service_name: SERVICE_NAME,
    service_user_id: to,
  };

  if (type === 'text' && text) {
    msg.text = text;
  }

  console.log('MESSAGE', msg);

  return [msg];
}
