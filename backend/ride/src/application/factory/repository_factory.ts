import RideRepository from "../repository/ride_repository"

export default interface RepositoryFactory {
  createRideRepository (): RideRepository
}
