import { LogControllerDecorator } from './log'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { serverError } from '../../presentation/helpers/http-helper'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

const makeStubController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          ok: true,
        },
      }
      return Promise.resolve(httpResponse)
    }
  }

  return new ControllerStub()
}

const makeLogErrorRepositoryStub = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
      Promise.resolve('stub')
    }
  }

  return new LogErrorRepositoryStub()
}

interface SutTypes {
  stub: Controller
  sut: LogControllerDecorator
  logErrorRepoStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const stub = makeStubController()
  const logErrorRepoStub = makeLogErrorRepositoryStub()
  const sut = new LogControllerDecorator(stub, logErrorRepoStub)

  return {
    stub,
    sut,
    logErrorRepoStub,
  }
}

describe('Log Decorator', () => {
  test('should call handle from decoreted controller', async () => {
    const { stub, sut } = makeSut()
    const handleSpy = jest.spyOn(stub, 'handle')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@gmail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass',
      },
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, stub, logErrorRepoStub } = makeSut()

    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    jest.spyOn(stub, 'handle').mockReturnValueOnce(Promise.resolve(error))

    const logSpy = jest.spyOn(logErrorRepoStub, 'logError')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@gmail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass',
      },
    }

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })

  test('should return the same return of the decoreted controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@gmail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass',
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        ok: true,
      },
    })
  })
})
