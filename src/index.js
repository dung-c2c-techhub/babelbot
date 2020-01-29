const services = require('./services');

class BabelBot {
  constructor(config) {
    this.getConfig = service => config[service];
  }

  parse(serviceName, payload) {
    const service = services[serviceName];
    if (!service) {
      return Promise.reject(`Unknown service ${serviceName}`);
    }

    const config = this.getConfig(serviceName)
    if (!config && serviceName !== 'loopback') {
      return Promise.reject(`Config missing for ${serviceName}`);
    }

    return service(config).parse(payload);
  }

  send(serviceName, payload) {
    const service = services[serviceName]
    if (!service) {
      return Promise.reject(`Unknown service ${serviceName}`);
    }

    const config = this.getConfig(serviceName)
    if (!config && serviceName !== 'loopback') {
      return Promise.reject(`Config missing for ${serviceName}`);
    }

    return service(config).send(payload);
  }

  verify(serviceName, payload) {
    const service = services[serviceName];
    if (!service) {
      return Promise.reject(`Unknown service ${serviceName}`);
    }

    const config = this.getConfig(serviceName);
    if (!config && serviceName !== 'loopback') {
      return Promise.reject(`Config missing for ${serviceName}`);
    }

    return service(config).verify(payload);
  }
}

module.exports = BabelBot;
