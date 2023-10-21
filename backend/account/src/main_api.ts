import CreatePassenger from "./application/usecase/create_passenger";
import DriverRepositoryDatabase from "./infra/repository/driver_repository_database";
import PassengerRepositoryDatabase from "./infra/repository/passenger_repository_database";
import PgPromiseAdapter from "./infra/database/pg_promise_adapter";
import MainController from "./infra/http/main_controller";
import ExpressAdapter from "./infra/http/express_adapter";
import RepositoryFactoryDatabase from "./infra/factory/repository_factory_database";
import UsecaseFactory from "./application/factory/usecase_factory";
import Registry from "./infra/dependency_injection/register";
import UserRepositoryDatabase from "./infra/repository/user_repository_database";
import RabbitMQAdapter from "./infra/queue/rabbitmq_adapter";
import QueueController from "./infra/queue/queue_controller";

async function main() {
  const connection = new PgPromiseAdapter();
  const queue = new RabbitMQAdapter()
  await queue.connect()
  const passengerRepository = new PassengerRepositoryDatabase(connection);
  const driverRepository = new DriverRepositoryDatabase(connection);
  const userRepository = new UserRepositoryDatabase(connection)
  const createPassenger = new CreatePassenger(passengerRepository, userRepository);
  const httpServer = new ExpressAdapter();
  const repositoryFactory = new RepositoryFactoryDatabase(connection)
  const usecaseFactory = new UsecaseFactory(repositoryFactory)
  const register = Registry.getInstance()
  register.provide('createPassenger', createPassenger)
  new MainController(httpServer, usecaseFactory, queue);
  new QueueController(queue)
  httpServer.listen(3002);
}

main()
