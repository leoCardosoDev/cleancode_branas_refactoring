import PassengerRepository from "../../src/application/repository/passenger_repository";
import CreatePassenger from "../../src/application/usecase/create_passenger";
import GetPassenger from "../../src/application/usecase/get_passenger";
import PassengerRepositoryDatabase from "../../src/infra/repository/passenger_repository_database";

test("Deve cadastrar um passageiro com database", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74"
  };
  const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
  const output = await usecase.execute(input);
  expect(output.passengerId).toBeDefined();
});

test("Não pode cadastrar um passageiro com email inválido", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test",
    document: "834.326.160-74"
  };
  const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
  await expect(() => usecase.execute(input)).rejects.toThrowError("Invalid email")
});

test("Deve obter um passageiro com database", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74"
  };
  const create = new CreatePassenger(new PassengerRepositoryDatabase());
  const getId = await create.execute(input);
  const usecase = new GetPassenger(new PassengerRepositoryDatabase());
  const output = await usecase.execute({passengerId: getId.passengerId});
  expect(output.name).toBe("John Doe");
  expect(output.email).toBe("john.doe@test.com");
  expect(output.document).toBe("834.326.160-74");
});
