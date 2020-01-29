const verify = require('./verify');

module.exports = config => ({
  verify: verify(config),
});
