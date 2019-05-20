const services = require('./services')

class BabelBot {
    constructor(config) {
        this.getConfig = service => config[service]
    }

    parse(serviceName, payload) {
        
        var service = services[serviceName]
        if (!service) return Promise.reject('unknown service ' + serviceName)

        var config = this.getConfig(serviceName)
        if (!config && serviceName !== 'loopback') return Promise.reject('config missing for ' + serviceName)

        return service(config).parse(payload)
    }

    send(serviceName, payload) {
        var service = services[serviceName]
        console.log('xxxxxxxx', payload)
        if (!service) return Promise.reject('unknown service ' + serviceName)

        var config = this.getConfig(serviceName)
        if (!config && serviceName !== 'loopback') return Promise.reject('config missing for ' + serviceName)

        return service(config).send(payload)
    }
}

module.exports = BabelBot
