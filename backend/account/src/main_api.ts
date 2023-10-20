import CreatePassenger from "./application/usecase/create_passenger";
import DriverRepositoryDatabase from "./infra/repository/driver_repository_database";
import PassengerRepositoryDatabase from "./infra/repository/passenger_repository_database";
import PgPromiseAdapter from "./infra/database/pg_promise_adapter";
import MainController from "./infra/http/main_controller";
import ExpressAdapter from "./infra/http/express_adapter";
import RepositoryFactoryDatabase from "./infra/factory/repository_factory_database";
import UsecaseFactory from "./application/factory/usecase_factory";
import Registry from "./infra/dependency_injection/register";

const connection = new PgPromiseAdapter();
const passengerRepository = new PassengerRepositoryDatabase(connection);
const driverRepository = new DriverRepositoryDatabase(connection);
const createPassenger = new CreatePassenger(passengerRepository);
const httpServer = new ExpressAdapter();
const repositoryFactory = new RepositoryFactoryDatabase(connection)
const usecaseFactory = new UsecaseFactory(repositoryFactory)
const register = Registry.getInstance()
register.provide('createPassenger', createPassenger)
new MainController(httpServer, usecaseFactory);
httpServer.listen(3002);
