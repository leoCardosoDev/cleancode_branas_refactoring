import Driver from "../../src/domain/driver/driver";

test("Deve criar um motorista", () => {
  const driver = Driver.create("John Doe", "john.doe@test.com", "83432616074", "AAA9999");
  expect(driver.driverId).toBeDefined();
  expect(driver.name).toBe("John Doe");
  expect(driver.email.value).toBe("john.doe@test.com");
  expect(driver.document.value).toBe("83432616074");
  expect(driver.carPlate.value).toBe("AAA9999");
});

test("Não pode criar um motorista com cpf inválido", () => {
  expect(() => Driver.create("John Doe", "john.doe@test.com", "8343261607", "AAA9999")).toThrowError("Invalid CPF");
});

test("Não pode criar um motorista com email inválido", () => {
  expect(() => Driver.create("John Doe", "john.doe@test", "83432616074", "AAA9999")).toThrowError("Invalid email");
});

test("Não pode criar um motorista com a placa do carro inválida", () => {
  expect(() => Driver.create("John Doe", "john.doe@test.com", "83432616074", "AAA999")).toThrowError("Invalid car plate");
});
