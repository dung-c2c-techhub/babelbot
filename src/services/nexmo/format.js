module.exports = ({ api_key, api_secret }) => ({ service_user_id, text }) => {
  const [provider, phone] = service_user_id.split(':');
  
  return {
    text,
    to: phone,
    from: provider,
    api_key,
    api_secret,
  };
};
