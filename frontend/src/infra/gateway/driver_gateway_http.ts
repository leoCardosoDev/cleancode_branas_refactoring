import DriverGateway, { CreateDriverInput } from './driver_gateway'
import HttpClient from '../http/http_client'

export default class DriverGatewayHttp implements DriverGateway {
  constructor (readonly httpClient: HttpClient) {}
  async create(driver: any) { 
    const input: CreateDriverInput = {
      name: driver.name.getValue(),
      email: driver.email.getValue(),
      document: driver.document.getValue(),
      carPlate: driver.carPlate.getValue()
    }
    return await this.httpClient.post('http://localhost:3000/drivers', input)
  }
}
