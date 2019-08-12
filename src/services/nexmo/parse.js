const SERVICE_NAME = 'nexmo';
const VALID_MESSAGE_TYPES = ['text'];

module.exports = () => async (message) => {
  if (!message.text || !VALID_MESSAGE_TYPES.includes(message.type)) return [];

  const msg = {
    timestamp: message['message-timestamp']
      ? new Date(message['message-timestamp']).getTime()
      : new Date(),
    service_name: SERVICE_NAME,
    service_user_id: `${message.msisdn}:${message.to}`,
  };

  if (message.type === 'text' && message.text) {
    msg.text = message.text;
  }

  console.log('MESSAGE', msg);

  return [msg];
}
