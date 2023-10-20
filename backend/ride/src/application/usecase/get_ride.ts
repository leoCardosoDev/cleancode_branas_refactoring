import AccountGatewayHttp from "../../infra/gateway/account_gateway_http";
import AxiosAdapter from "../../infra/http/axios_adapter";
import RepositoryFactory from "../factory/repository_factory";
import AccountGateway from "../gateway/account_gateway";
import RideRepository from "../repository/ride_repository";

export default class GetRide {
  rideRepository: RideRepository

  constructor (readonly repositoryFactory: RepositoryFactory, 
    readonly accountGateway: AccountGateway = new AccountGatewayHttp(new AxiosAdapter())
    ) {
    this.rideRepository = repositoryFactory.createRideRepository()
  }

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.get(input.rideId);
    const passenger = await this.accountGateway.getPassenger(ride.passengerId)
    let driver
    if (ride.driverId) {
      driver = await this.accountGateway.getDriver(ride.driverId)
    }
    return {
      rideId: ride.rideId, 
      driverId: ride.driverId,
      passengerId: ride.passengerId,
      status: ride.status.value,
      requestDate: ride.requestDate,
      acceptDate: ride.acceptDate,
      startDate: ride.startDate,
      endDate: ride.endDate,
      passengerName: passenger.name,
      driverName: driver?.name
    }
  }
}

type Input = {
    rideId: string
}

type Output = {
  rideId: string,
  driverId?: string,
  passengerId?: string,
  status: string,
  requestDate: Date
  acceptDate?: Date
  startDate?: Date
  endDate?: Date
  passengerName: string
  driverName?: string
}

