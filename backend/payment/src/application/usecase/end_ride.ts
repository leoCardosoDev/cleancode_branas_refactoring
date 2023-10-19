import Transaction from "../../domain/transaction/transaction";
import MailGateway from "../gateway/mail_gateway";
import PaymentGateway from "../gateway/payment_gateway";
import PassengerRepository from "../repository/passenger_repository";
import RideRepository from "../repository/ride_repository";
import TransactionRepository from "../repository/transaction_repository";

export default class EndRide {

  constructor(
    readonly rideRepository: RideRepository, 
    readonly passengerRepository: PassengerRepository, 
    readonly paymentGateway: PaymentGateway,
    readonly transactionRepository: TransactionRepository,
    readonly mailGateway: MailGateway
    ) {}

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.end(input.date);
    await this.rideRepository.update(ride);
    // big ball of mud
    const passenger = await this.passengerRepository.get(input.rideId)
    const amount = ride.calculate()
    const paymenGatewaytInput = {
      name: passenger.name,
      email: passenger.email.value,
      amount
    }
    const outputPaymentGateway = await this.paymentGateway.process(paymenGatewaytInput)
    const transaction = new Transaction(outputPaymentGateway.transactionId, passenger.name, passenger.email.value, amount)
    await this.transactionRepository.save(transaction)
    const message = `Dear ${passenger.name}, thanks for your ride`
    await this.mailGateway.send(passenger.email.value, message)
  }
  
}

type Input = {
  rideId: string,
  date: Date
}
