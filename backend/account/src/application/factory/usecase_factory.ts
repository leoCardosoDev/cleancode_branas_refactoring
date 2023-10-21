import CreateDriver from "../usecase/create_driver";
import CreatePassenger from "../usecase/create_passenger";
import GetDriver from "../usecase/get_driver";
import GetPassenger from "../usecase/get_passenger";

import RepositoryFactory from "./repository_factory";

export default class UsecaseFactory {
  constructor (readonly repositoryFactory: RepositoryFactory) {}

  createCreatePassenger () {
    return new CreatePassenger(this.repositoryFactory.createPassengerRepository(), this.repositoryFactory.createUserRepository())
  }

  createCreateDriver () {
    return new CreateDriver(this.repositoryFactory.createDriverRepository())
  }

  createGetPassenger () {
    return new GetPassenger(this.repositoryFactory.createPassengerRepository(), this.repositoryFactory.createUserRepository())
  }

  createGetDriver () {
    return new GetDriver(this.repositoryFactory.createDriverRepository())
  }

}
