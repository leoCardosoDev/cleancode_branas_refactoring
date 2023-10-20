import CalculateRide from "../usecase/calculate_ride";
import CreateDriver from "../usecase/create_driver";
import CreatePassenger from "../usecase/create_passenger";
import GetDriver from "../usecase/get_driver";
import GetPassenger from "../usecase/get_passenger";
import GetRide from "../usecase/get_ride";
import RequestRide from "../usecase/request_ride";
import RepositoryFactory from "./repository_factory";

export default class UsecaseFactory {
  constructor (readonly repositoryFactory: RepositoryFactory) {}

  createCreatePassenger () {
    return new CreatePassenger(this.repositoryFactory.createPassengerRepository())
  }

  createCreateDriver () {
    return new CreateDriver(this.repositoryFactory.createDriverRepository())
  }

  createGetPassenger () {
    return new GetPassenger(this.repositoryFactory.createPassengerRepository())
  }

  createGetDriver () {
    return new GetDriver(this.repositoryFactory.createDriverRepository())
  }

  createRequestRide () {
    return new RequestRide(this.repositoryFactory.createRideRepository())
  }

  createGetRide() {
    return new GetRide(this.repositoryFactory)
  }

  createCalculateRide () {
    return new CalculateRide()
  }
}
