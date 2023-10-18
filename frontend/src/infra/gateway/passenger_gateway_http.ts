import axios from 'axios'
import PassengerGateway from './passenger_gateway'

export default class PassengerGatewayHttp implements PassengerGateway {
  async save(passenger: any) {
    const response = await axios.post('http://localhost:3000/passengers', passenger)
    return response.data
  }
}
