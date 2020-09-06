import { LogControllerDecorator } from './log'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

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

describe('Log Decorator', () => {
  test('should call handle from decoreted controller', async () => {
    const controllerStub = makeStubController()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const sut = new LogControllerDecorator(controllerStub)
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
