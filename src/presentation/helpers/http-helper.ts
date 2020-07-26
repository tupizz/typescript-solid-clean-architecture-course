import { HttpRespone } from '../protocols/http'
import { ServerError } from '../errors'

export const badRequest = (error: Error): HttpRespone => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpRespone => ({
  statusCode: 500,
  body: new ServerError()
})
