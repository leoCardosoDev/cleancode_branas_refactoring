import RideRepository from "../repository/ride_repository";

export default class GetRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.get(input.rideId);
    return {
      rideId: ride.rideId, 
      driverId: ride.driverId,
      status: ride.status,
      requestDate: ride.requestDate,
      acceptDate: ride.acceptDate
    }
  }
}

type Input = {
    rideId: string
}

type Output = {
  rideId: string,
  driverId?: string,
  status: string,
  requestDate: Date
  acceptDate?: Date
}

