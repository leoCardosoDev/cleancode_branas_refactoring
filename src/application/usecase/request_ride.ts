import Coord from "../../domain/distance/coord";
import Ride from "../../domain/ride/ride"
import RideRepository from "../repository/ride_repository";

export default class RequestRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const ride = Ride.create(input.passengerId, new Coord(input.from.lat, input.from.long), new Coord(input.to.lat, input.to.long), input.date);
    await this.rideRepository.save(ride);
    return {
      rideId: ride.rideId
    };
  }
}

type Input = {
    passengerId: string,
    from: { lat: number, long: number },
    to: {lat: number, long: number },
    date: Date
}

type Output = {
  rideId: string,
}
