import CreatePassenger from "../../src/application/usecase/create_passenger";
import GetPassenger from "../../src/application/usecase/get_passenger";

test("Deve cadastrar um passageiro", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74"
  };
  const usecase = new CreatePassenger();
  const output = await usecase.execute(input);
  expect(output.passengerId).toBeDefined();
});

test("Deve obter um passageiro", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74"
  };
  const create = new CreatePassenger();
  const getId = await create.execute(input);
  const usecase = new GetPassenger();
  const output = await usecase.execute({passengerId: getId.passengerId});
  expect(output.name).toBe("John Doe");
  expect(output.email).toBe("john.doe@test.com");
  expect(output.document).toBe("834.326.160-74");
});
