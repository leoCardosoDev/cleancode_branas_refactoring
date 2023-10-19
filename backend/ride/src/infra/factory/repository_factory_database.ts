import RepositoryFactory from '../../application/factory/repository_factory'
import DriverRepository from "../../application/repository/driver_repository"
import PassengerRepository from "../../application/repository/passenger_repository"
import RideRepository from "../../application/repository/ride_repository"
import DatabaseConnection from "../database/database_connection"
import DriverRepositoryDatabase from '../repository/driver_repository_database'
import PassengerRepositoryDatabase from "../repository/passenger_repository_database"
import RideRepositoryDatabase from '../repository/ride_repository_database'

export default class RepositoryFactoryDatabase implements RepositoryFactory {

  constructor (readonly connection: DatabaseConnection) {}

  createPassengerRepository(): PassengerRepository {
    return new PassengerRepositoryDatabase(this.connection)
  }
  createDriverRepository(): DriverRepository {
    return new DriverRepositoryDatabase(this.connection)
  }
  createRideRepository(): RideRepository {
   return new RideRepositoryDatabase(this.connection)
  }

}
