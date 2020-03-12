const flow = require('lodash.flow');
const chunker = require('../../lib/chunker');
const parse = require('./parse');
const format = require('./format');
const makeRequest = require('./makeRequest');

module.exports = (config) => {
  const sendFunc = flow(format(config), makeRequest(config)('/sms'));
  return {
    parse,
    send: chunker(sendFunc),
  };
};
