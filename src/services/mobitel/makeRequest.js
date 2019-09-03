const fetch = require('../../lib/fetch');

const baseUrl = 'https://rest.nexmo.com';

module.exports = () => path => body => {
  return fetch(baseUrl + path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
