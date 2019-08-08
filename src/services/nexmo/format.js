module.exports = ({ api_key, api_secret }) => ({ service_user_id, text }) => {
  const [phone, mask] = service_user_id.split(':');
  
  return {
    text,
    to: phone,
    from: mask,
    api_key,
    api_secret,
  };
};
