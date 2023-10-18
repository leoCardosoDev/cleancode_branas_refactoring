import PassengerGateway from './passenger_gateway'
import HttpClient from '../http/http_client'
import Passenger from '../../domain/passenger/passenger'

export default class PassengerGatewayHttp implements PassengerGateway {
  constructor (readonly httpClient: HttpClient) {}
  async save(passenger: Passenger) {
    const passengerData = await this.httpClient.post('http://localhost:3000/passengers', passenger)
    return passengerData.passengerId
  }
}
