import test from 'ava'

const execa = require('execa')
const got = require('got')

test('with all options', async t => {
  const {stdout} = await execa('./bin/run', ['sign', 'AuthKey_QN9TMNHK76.p8', 'Z8V87TZ5G7', 'QN9TMNHK76'])
  const response = await got('https://api.music.apple.com/v1/catalog/us/search?term=monstercat', {
    headers: {
      "authorization": "Bearer " + stdout
    }
  })
  t.true(response.statusCode === 200, 'response code is not 200. Either token is invalid or Apple Music API is down')
})

test('with key id omitted', async t => {
  t.plan(2)

  const {stdout, stderr} = await execa('./bin/run', ['sign', 'AuthKey_QN9TMNHK76.p8', 'Z8V87TZ5G7'])

  t.false(stderr.indexOf('QN9TMNHK76') === -1, 'Key ID detection failed')

  const response = await got('https://api.music.apple.com/v1/catalog/us/search?term=monstercat', {
    headers: {
      "authorization": "Bearer " + stdout
    }
  })
  t.true(response.statusCode === 200, 'response code is not 200. Either token is invalid or Apple Music API is down')
})
