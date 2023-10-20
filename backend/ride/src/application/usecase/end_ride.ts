import PaymentGatewayHttp from "../../infra/gateway/payment_gateway_http";
import AxiosAdapter from "../../infra/http/axios_adapter";
import PaymentGateway from "../gateway/payment_gateway";
import PassengerRepository from "../repository/passenger_repository";
import RideRepository from "../repository/ride_repository";

export default class EndRide {

  constructor(
    readonly rideRepository: RideRepository, 
    readonly passengerRepository: PassengerRepository, 
    readonly paymentGateway: PaymentGateway = new PaymentGatewayHttp(new AxiosAdapter()),
    ) {}

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.end(input.date);
    await this.rideRepository.update(ride);
    const passenger = await this.passengerRepository.get(ride.passengerId)
    const amount = ride.calculate()
    const paymenGatewaytInput = {
      name: passenger.name,
      email: passenger.email.value,
      amount
    }
    await this.paymentGateway.process(paymenGatewaytInput)
  }
  
}

type Input = {
  rideId: string,
  date: Date
}
