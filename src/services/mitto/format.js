module.exports = (config) => (msg) => {
  const { service_user_id, text } = msg;
  const [phone, mask] = service_user_id.split(':');

  return {
    text,
    to: phone,
    from: mask,
  };
};
