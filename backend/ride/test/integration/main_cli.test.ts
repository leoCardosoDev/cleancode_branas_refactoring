import CreatePassenger from "../../src/application/usecase/create_passenger";
import CLIController from "../../src/infra/cli/cli_controller";
import InputOutput from "../../src/infra/cli/input_output";
import PgPromiseAdapter from "../../src/infra/database/pg_promise_adapter";
import PassengerRepositoryDatabase from "../../src/infra/repository/passenger_repository_database";

test("Deve criar um passageiro usando o cli", async() => {
  const output:any = [];
  const connection = new PgPromiseAdapter();
  const passegerRepository = new PassengerRepositoryDatabase(connection);
  const createPassenger = new CreatePassenger(passegerRepository);
  const inputOutput = new class extends InputOutput {
    write(text: string): void {
      output.push(JSON.parse(text))
    }
  }
  new CLIController(inputOutput, createPassenger);
  await inputOutput.type("create-passenger cli cli@cli.com 83432616074");
  expect(output.at(0)?.passengerId).toBeDefined();
  connection.close();
});
