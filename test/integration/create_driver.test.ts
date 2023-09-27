import DriverRepository from "../../src/application/repository/driver_repository";
import CreateDriver from "../../src/application/usecase/create_driver";
import GetDriver from "../../src/application/usecase/get_driver";
import Driver from "../../src/domain/driver";
import DriverRepositoryDatabase from "../../src/infra/repository/driver_repository_database";

test("Deve cadastrar um motorista", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74",
    carPlate: "AAA9999"
  };
  const usecase = new CreateDriver(new DriverRepositoryDatabase());
  const output = await usecase.execute(input);
  expect(output.driverId).toBeDefined();
});

test("Deve obter um motorista com stub", async () => {
  const driverRepositoryStub: DriverRepository = {
    async save (driver: any): Promise<void> {},
    async get (driverId: string): Promise<any> {
      return Driver.create("John Doe","john.doe@test.com","834.326.160-74","AAA9999");
    }
  }
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74",
    carPlate: "AAA9999"
  };
  const create = new CreateDriver(driverRepositoryStub);
  const getId = await create.execute(input);
  const usecase = new GetDriver(driverRepositoryStub);
  const output = await usecase.execute({driverId: getId.driverId});
  expect(output.name).toBe("John Doe");
  expect(output.email).toBe("john.doe@test.com");
  expect(output.document).toBe("834.326.160-74");
  expect(output.carPlate).toBe("AAA9999");
});

test("Deve obter um motorista com database", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74",
    carPlate: "AAA9999"
  };
  const create = new CreateDriver(new DriverRepositoryDatabase());
  const getId = await create.execute(input);
  const usecase = new GetDriver(new DriverRepositoryDatabase());
  const output = await usecase.execute({driverId: getId.driverId});
  expect(output.name).toBe("John Doe");
  expect(output.email).toBe("john.doe@test.com");
  expect(output.document).toBe("834.326.160-74");
  expect(output.carPlate).toBe("AAA9999");
});
