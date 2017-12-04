const { test } = require('tap')
const proxyquire = require('proxyquire')

const BabelBot = proxyquire('../index', {
	'./services': {
		foo: config => ({
			send: payload => Promise.resolve({ payload, config }),
			parse: payload => Promise.resolve({ payload, config }),
		})
	}
})

test('parse', assert => {
	var config = { foo: 'bar' }
	var service = new BabelBot(config)

	var payload = {
		bar: 'baz',
	}

	var expected = {
		payload,
		config: 'bar',
	}

	return service.parse('foo', payload)
		.then(res => assert.deepEquals(res, expected, 'sends to foo parser'))
})

test('parse - invalid service', assert => {
	var config = { foo: 'bar' }
	var service = new BabelBot(config)

	return service.parse('bar', {})
		.then(assert.fail)
		.catch(e => assert.equals(e, 'unknown service bar'))
})

test('parse - missing config', assert => {
	var service = new BabelBot({})

	return service.parse('foo', {})
		.then(assert.fail)
		.catch(e => assert.equals(e, 'config missing for foo'))
})

test('send', assert => {
	var config = { foo: 'bar' }
	var service = new BabelBot(config)

	var payload = {
		bar: 'baz',
	}

	var expected = {
		payload,
		config: 'bar',
	}

	return service.send('foo', payload)
		.then(res => assert.deepEquals(res, expected, 'sends to foo sender'))
})


test('send - invalid service', assert => {
	var config = { foo: 'bar' }
	var service = new BabelBot(config)

	return service.send('bar', {})
		.then(assert.fail)
		.catch(e => assert.equals(e, 'unknown service bar'))
})

test('send - missing config', assert => {
	var service = new BabelBot({})

	return service.send('foo', {})
		.then(assert.fail)
		.catch(e => assert.equals(e, 'config missing for foo'))
})
