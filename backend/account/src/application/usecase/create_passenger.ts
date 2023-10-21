import PassengerRepository from "../repository/passenger_repository";
import Passenger from "../../domain/passenger/passenger";
import User from "../../domain/user/user";
import UserRepository from "../repository/user_repository";

export default class CreatePassenger {
  constructor(readonly passengerRepository: PassengerRepository, readonly userRepository: UserRepository){}
  async execute(input: Input): Promise<Output> {
    const passenger = Passenger.create(input.name, input.email, input.document);
    await this.passengerRepository.save(passenger);
    if (input.password) {
      try {
        const user = User.create(input.email, input.password, 'pbkdf2')
        await this.userRepository.save(user)
      } catch (e: any) {
        // await this.passengerRepository.delete(passenger.passengerId)
      }
    }
    return {
      passengerId: passenger.passengerId
    };
  }
}
type Input = {
  name: string,
  email: string,
  document: string,
  password?: string
}

type Output = {
  passengerId: string
}
