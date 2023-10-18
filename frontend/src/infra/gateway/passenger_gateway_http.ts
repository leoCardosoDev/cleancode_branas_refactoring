import PassengerGateway from './passenger_gateway'
import HttpClient from '../http/http_client'

export default class PassengerGatewayHttp implements PassengerGateway {
  constructor (readonly httpClient: HttpClient) {}
  async save(passenger: any) {
    return await this.httpClient.post('http://localhost:3000/passengers', passenger)
  }
}
