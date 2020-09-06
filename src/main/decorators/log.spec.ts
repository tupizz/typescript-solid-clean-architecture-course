import { LogControllerDecorator } from './log'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

interface SutTypes {
  stub: Controller
  sut: LogControllerDecorator
}

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

const makeSut = (): SutTypes => {
  const stub = makeStubController()
  const sut = new LogControllerDecorator(stub)

  return {
    stub,
    sut,
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
})
