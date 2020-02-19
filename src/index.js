const services = require('./services');

class BabelBot {
  constructor(config) {
    this.getConfig = (service, sender) => (sender ? config[service][sender] : config[service]);
  }

  parse(service, payload) {
    const [serviceName, serviceSender] = service.split('.');
    const selectedService = services[serviceName];

    if (!selectedService) {
      const error = new Error(`Unknown service ${serviceName}`);
      return Promise.reject(error);
    }

    const config = this.getConfig(serviceName, serviceSender);
    if (!config && serviceName !== 'loopback') {
      const error = new Error(`Config missing for ${serviceName}`);
      return Promise.reject(error);
    }

    return selectedService(config).parse(payload, serviceSender);
  }

  send(service, payload) {
    const [serviceName, serviceSender] = service.split('.');
    const selectedService = services[serviceName];

    if (!selectedService) {
      const error = new Error(`Unknown service ${serviceName}`);
      return Promise.reject(error);
    }

    const config = this.getConfig(serviceName, serviceSender);
    if (!config && serviceName !== 'loopback') {
      const error = new Error(`Config missing for ${serviceName}`);
      return Promise.reject(error);
    }

    return selectedService(config).send(payload);
  }
}

module.exports = BabelBot;
