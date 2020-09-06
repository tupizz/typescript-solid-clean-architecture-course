import { MongoClient, Collection } from 'mongodb'

class MongoHelperClass {
  private uri: string
  private client: MongoClient

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  }

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }

    return this.client.db().collection(name)
  }

  map(model: any): any {
    const { _id, ...restAttributes } = model
    return { id: _id, ...restAttributes }
  }
}

export const MongoHelper = new MongoHelperClass()
