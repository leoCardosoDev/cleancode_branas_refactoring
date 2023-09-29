import Passenger from "../../domain/passenger/passenger";

export default interface PassengerRepository {
  save(passenger: Passenger): Promise<void>;
  get(passengerId: string): Promise<Passenger>;
}
