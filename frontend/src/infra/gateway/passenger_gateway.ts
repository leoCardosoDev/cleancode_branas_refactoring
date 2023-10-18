import Passenger from "../../domain/passenger/passenger";

export default interface PassengerGateway {
  save(passenger: Passenger): Promise<any>
}
