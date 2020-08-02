import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export class BcryptAdapter implements Encrypter {
  private readonly salt

  constructor(salt) {
    this.salt = salt
  }

  async encrypt(value: string): Promise<string> {
    const hashedPassword = bcrypt.hash(value, this.salt)
    return hashedPassword
  }
}
