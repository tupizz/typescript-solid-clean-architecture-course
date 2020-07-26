import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

import {
  Controler,
  EmailValidator,
  HttpRespone,
  HttpRequest
} from '../protocols'

export class SignUpController implements Controler {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpRespone {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) { return badRequest(new MissingParamError(field)) }
      }

      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
