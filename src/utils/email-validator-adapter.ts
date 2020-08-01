import validator from 'validator'
import { EmailValidator } from '../presentation/protocols/email-validator'

class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email)
  }
}
export default EmailValidatorAdapter
