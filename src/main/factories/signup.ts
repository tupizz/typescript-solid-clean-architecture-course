import { SignUpController } from '../../presentation/controllers/signup/signup'
import EmailValidatorAdapter from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'

export const makeSignUpController = (): SignUpController => {
  const encrypter = new BcryptAdapter(12)
  const accountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, accountRepository)
  const emailValidator = new EmailValidatorAdapter()
  return new SignUpController(emailValidator, addAccount)
}
