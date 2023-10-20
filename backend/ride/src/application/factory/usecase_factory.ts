import CalculateRide from "../usecase/calculate_ride";
import GetRide from "../usecase/get_ride";
import RequestRide from "../usecase/request_ride";
import RepositoryFactory from "./repository_factory";

export default class UsecaseFactory {
  constructor (readonly repositoryFactory: RepositoryFactory) {}
  
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
