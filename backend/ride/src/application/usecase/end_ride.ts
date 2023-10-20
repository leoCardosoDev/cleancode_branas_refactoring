import AccountGatewayHttp from "../../infra/gateway/account_gateway_http";
import PaymentGatewayHttp from "../../infra/gateway/payment_gateway_http";
import AxiosAdapter from "../../infra/http/axios_adapter";
import AccountGateway from "../gateway/account_gateway";
import PaymentGateway from "../gateway/payment_gateway";
import RideRepository from "../repository/ride_repository";

export default class EndRide {

  constructor(
    readonly rideRepository: RideRepository,
    readonly paymentGateway: PaymentGateway = new PaymentGatewayHttp(new AxiosAdapter()),
    readonly accountGateway: AccountGateway = new AccountGatewayHttp(new AxiosAdapter())
    ) {}

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.end(input.date);
    await this.rideRepository.update(ride);
    const amount = ride.calculate()
    const passenger = await this.accountGateway.getPassenger(ride.passengerId)
    const paymenGatewaytInput = {
      name: passenger.name,
      email: passenger.email,
      amount
    }
    await this.paymentGateway.process(paymenGatewaytInput)
  }
}

type Input = {
  rideId: string,
  date: Date
}
