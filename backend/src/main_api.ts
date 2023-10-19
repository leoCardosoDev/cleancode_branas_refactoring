import CalculateRide from "./application/usecase/calculate_ride";
import CreatePassenger from "./application/usecase/create_passenger";
import CreateDriver from "./application/usecase/create_driver";
import GetPassenger from "./application/usecase/get_passenger";
import GetDriver from "./application/usecase/get_driver";
import DriverRepositoryDatabase from "./infra/repository/driver_repository_database";
import PassengerRepositoryDatabase from "./infra/repository/passenger_repository_database";
import PgPromiseAdapter from "./infra/database/pg_promise_adapter";
import MainController from "./infra/http/main_controller";
import ExpressAdapter from "./infra/http/express_adapter";
import HapiAdapter from "./infra/http/hapi_adapter";
import RequestRide from "./application/usecase/request_ride";
import RideRepositoryDatabase from "./infra/repository/ride_repository_database";
import RepositoryFactoryDatabase from "./infra/factory/repository_factory_database";
import UsecaseFactory from "./application/factory/usecase_factory";
import Registry from "./infra/dependency_injection/register";

const connection = new PgPromiseAdapter();
const passengerRepository = new PassengerRepositoryDatabase(connection);
// const driverRepository = new DriverRepositoryDatabase(connection);
// const rideRepository = new RideRepositoryDatabase(connection);
const calculateRide = new CalculateRide();
const createPassenger = new CreatePassenger(passengerRepository);
// const getPassenger = new GetPassenger(passengerRepository);
// const createDriver = new CreateDriver(driverRepository);
// const getDriver = new GetDriver(driverRepository);
// const requestRide = new RequestRide(rideRepository)
const httpServer = new ExpressAdapter();
// const httpServer = new HapiAdapter();
const repositoryFactory = new RepositoryFactoryDatabase(connection)
const usecaseFactory = new UsecaseFactory(repositoryFactory)
const register = Registry.getInstance()
register.provide('calculateRide', calculateRide)
register.provide('createPassenger', createPassenger)
new MainController(httpServer, usecaseFactory);
httpServer.listen(3000);
