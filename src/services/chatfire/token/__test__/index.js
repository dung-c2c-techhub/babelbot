const { test } = require('tap')
const proxyquire = require('proxyquire')

const defaultStubs = {
  './jwt': {
    generate: payload => JSON.stringify(payload)
  },
  './cache': {
    get: () => null,
    set: () => null
  },
  './makeRequest': payload => Promise.resolve({ access_token: payload, expires_in: 100 })
}

const index = proxyquire('../index', defaultStubs)

test('generates token', assert => {
  var cache

  const index = proxyquire('../index', Object.assign({}, defaultStubs, {
    './cache': {
      get: () => null,
      set: (p, a, e) => cache = { p, a, e }
    }
  }))

  const config = { foo: 'bar', project_id: 'project_baz' }

  const expected = {
    access_token: {
      assertion: JSON.stringify(config),
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer'
    },
    project_id: 'project_baz'
  }

  const expectedCache = {
    p: expected.project_id,
    a: expected.access_token,
    e: 100
  }

  return index(config)
    .then(res => {
      assert.deepEquals(res, expected, 'returns new token')
      assert.deepEquals(cache, expectedCache, 'sets cache')
    })
})

test('uses cached token', assert => {
  const index = proxyquire('../index', Object.assign({}, defaultStubs, {
    './cache': {
      get: () => 'foobar_token'
    }
  }))

  const config = { foo: 'bar', project_id: 'project_baz' }

  const expected = {
    access_token: 'foobar_token',
    project_id: 'project_baz'
  }

  return index(config)
    .then(res => assert.deepEquals(res, expected, 'returns cached token'))
})
