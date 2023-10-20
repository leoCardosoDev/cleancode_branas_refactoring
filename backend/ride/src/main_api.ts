import CalculateRide from "./application/usecase/calculate_ride";
import PgPromiseAdapter from "./infra/database/pg_promise_adapter";
import MainController from "./infra/http/main_controller";
import ExpressAdapter from "./infra/http/express_adapter";
import RequestRide from "./application/usecase/request_ride";
import RideRepositoryDatabase from "./infra/repository/ride_repository_database";
import RepositoryFactoryDatabase from "./infra/factory/repository_factory_database";
import UsecaseFactory from "./application/factory/usecase_factory";
import Registry from "./infra/dependency_injection/register";

const connection = new PgPromiseAdapter();
const rideRepository = new RideRepositoryDatabase(connection);
const calculateRide = new CalculateRide();
const requestRide = new RequestRide(rideRepository)
const httpServer = new ExpressAdapter();
const repositoryFactory = new RepositoryFactoryDatabase(connection)
const usecaseFactory = new UsecaseFactory(repositoryFactory)
const register = Registry.getInstance()
register.provide('calculateRide', calculateRide)
new MainController(httpServer, usecaseFactory);
httpServer.listen(3000);
