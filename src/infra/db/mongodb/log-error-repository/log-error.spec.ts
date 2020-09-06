import { MongoHelper } from '../helpers/mongo-helpers'
import { LogErrorMongoRepository } from './log-error'
import { Collection } from 'mongodb'

describe('Log Mongodb repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should create an error log on success', async () => {
    const sut = new LogErrorMongoRepository()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
