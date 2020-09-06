import { MongoHelper as sut } from './mongo-helpers'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('should reconnect if mongo db client is null/down', async () => {
    let accountCollections = await sut.getCollection('accounts')
    expect(accountCollections).toBeTruthy()

    await sut.disconnect()

    accountCollections = await sut.getCollection('accounts')
    expect(accountCollections).toBeTruthy()
  })
})
