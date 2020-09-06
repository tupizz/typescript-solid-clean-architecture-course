import { LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helpers'

export class LogErrorMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorsCollection = await MongoHelper.getCollection('errors')
    await errorsCollection.insertOne({
      stack,
      date: new Date(),
    })
  }
}
