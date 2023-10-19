import CreatePassenger from "./application/usecase/create_passenger";
import CLIController from "./infra/cli/cli_controller";
import NodeInputOutput from "./infra/cli/node_input_output";
import PgPromiseAdapter from "./infra/database/pg_promise_adapter";
import PassengerRepositoryDatabase from "./infra/repository/passenger_repository_database";

const connection = new PgPromiseAdapter();
const passegerRepository = new PassengerRepositoryDatabase(connection);
const createPassenger = new CreatePassenger(passegerRepository);
const inputOutput = new NodeInputOutput();
new CLIController(inputOutput, createPassenger);
