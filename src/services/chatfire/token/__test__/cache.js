const { test } = require('tap')
const cache = require('../cache')

test('sets and gets', assert => {
  assert.plan(3)
  cache.set('project_foo', 'bar_token', 1000)
  assert.equals(cache.get('project_foo'), 'bar_token', 'gets from cache')
  assert.false(cache.get('project_bar'), 'does not exist')

  cache.set('project_foo', 'bar_token', 0)
  assert.false(cache.get('project_foo'), 'does not get expired')
})