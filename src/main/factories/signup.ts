import EmailValidatorAdapter from '../../utils/email-validator-adapter'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { LogErrorMongoRepository } from '../../infra/db/mongodb/log-error-repository/log-error'

const makeAddAccountUseCase = (): DbAddAccount => {
  const encrypter = new BcryptAdapter(12)
  const accountRepository = new AccountMongoRepository()
  return new DbAddAccount(encrypter, accountRepository)
}

const makeEmailValidator = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

const makeLogRepository = (): LogErrorRepository => {
  return new LogErrorMongoRepository()
}

const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeEmailValidator(), makeAddAccountUseCase())
  return new LogControllerDecorator(controller, makeLogRepository())
}

export { makeSignUpController }
