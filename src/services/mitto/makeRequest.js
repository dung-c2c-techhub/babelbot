const fetch = require('../../lib/fetch');

const baseUrl = 'https://rest.mittoapi.com';

module.exports = ({ apiKey }) => (path) => ({ text, from, to }) => {
  const body = {
    text,
    from,
    to,
    type: 'Unicode',
  };

  return fetch(baseUrl + path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=utf-8;',
      'X-Mitto-API-Key': apiKey,
    },
    cache: 'no-cache',
  });
};
