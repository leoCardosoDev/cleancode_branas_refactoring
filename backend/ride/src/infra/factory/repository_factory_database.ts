import RepositoryFactory from '../../application/factory/repository_factory'
import RideRepository from "../../application/repository/ride_repository"
import DatabaseConnection from "../database/database_connection"
import RideRepositoryDatabase from '../repository/ride_repository_database'

export default class RepositoryFactoryDatabase implements RepositoryFactory {

  constructor (readonly connection: DatabaseConnection) {}
  createRideRepository(): RideRepository {
   return new RideRepositoryDatabase(this.connection)
  }

}
