import DriverRepository from "../repository/driver_repository"
import PassengerRepository from "../repository/passenger_repository"

export default interface RepositoryFactory {
  createPassengerRepository (): PassengerRepository
  createDriverRepository (): DriverRepository
}
