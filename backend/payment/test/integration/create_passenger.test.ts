import CreatePassenger from "../../src/application/usecase/create_passenger";
import GetPassenger from "../../src/application/usecase/get_passenger";
import PgPromiseAdapter from "../../src/infra/database/pg_promise_adapter";
import PassengerRepositoryDatabase from "../../src/infra/repository/passenger_repository_database";

test("Deve cadastrar um passageiro com database", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74"
  };
  const connection = new PgPromiseAdapter();
  const usecase = new CreatePassenger(new PassengerRepositoryDatabase(connection));
  const output = await usecase.execute(input);
  expect(output.passengerId).toBeDefined();
  await connection.close();
});

test("Não pode cadastrar um passageiro com email inválido", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test",
    document: "834.326.160-74"
  };
  const connection = new PgPromiseAdapter();
  const usecase = new CreatePassenger(new PassengerRepositoryDatabase(connection));
  await expect(() => usecase.execute(input)).rejects.toThrowError("Invalid email");
  await connection.close();
});

test("Deve obter um passageiro com database", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74"
  };
  const connection = new PgPromiseAdapter();
  const create = new CreatePassenger(new PassengerRepositoryDatabase(connection));
  const getId = await create.execute(input);
  const usecase = new GetPassenger(new PassengerRepositoryDatabase(connection));
  const output = await usecase.execute({passengerId: getId.passengerId});
  expect(output.name).toBe("John Doe");
  expect(output.email).toBe("john.doe@test.com");
  expect(output.document).toBe("834.326.160-74");
  await connection.close();
});
