import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },

  getCollection(name: string): Collection {
    const client: MongoClient = this.client
    return client.db().collection(name)
  },

  map(model: any): any {
    const { _id, ...restAttributes } = model
    return { id: _id, ...restAttributes }
  },
}
