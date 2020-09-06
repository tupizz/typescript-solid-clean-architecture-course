import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly repository: LogErrorRepository

  constructor(controller: Controller, repository: LogErrorRepository) {
    this.controller = controller
    this.repository = repository
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode === 500) {
      await this.repository.logError(httpResponse.body.stack)
    }

    return httpResponse
  }
}
