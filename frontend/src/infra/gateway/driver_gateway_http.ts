import DriverGateway from './driver_gateway'
import HttpClient from '../http/http_client'

export default class DriverGatewayHttp implements DriverGateway {
  constructor (readonly httpClient: HttpClient) {}
  async save(driver: any) { 
    return await this.httpClient.post('http://localhost:3000/drivers', driver)
  }
}
