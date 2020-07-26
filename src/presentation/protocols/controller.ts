import { HttpRequest, HttpRespone } from './http'

export interface Controler {
  handle: (httpRequest: HttpRequest) => HttpRespone
}
