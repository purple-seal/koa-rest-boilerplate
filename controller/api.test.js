const api = require('./api')

describe('api controller', () => {
  test('get', async () => {
    expect(await api.get()).toEqual('OK')
  })
})
