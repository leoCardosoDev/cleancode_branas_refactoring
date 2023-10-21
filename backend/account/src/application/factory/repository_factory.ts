import DriverRepository from "../repository/driver_repository"
import PassengerRepository from "../repository/passenger_repository"
import UserRepository from "../repository/user_repository"

export default interface RepositoryFactory {
  createPassengerRepository (): PassengerRepository
  createDriverRepository (): DriverRepository
  createUserRepository (): UserRepository
}
