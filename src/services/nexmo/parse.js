const SERVICE_NAME = 'nexmo';
const VALID_MESSAGE_TYPES = ['text']


module.exports = () => async (asd, asd1) => {
  console.log('LLEGA!!!!!!!!!!');
  console.log(asd, asd1);

  // if (!message || !VALID_MESSAGE_TYPES.includes(message.type)) return [];

  // const msg = {
  //   timestamp,
  //   service_name: SERVICE_NAME,
  //   service_user_id: sender.id
  // };

  // if (message.type === 'text' && message.text) {
  //   msg.text = message.text;
  // }

  return [];
}
