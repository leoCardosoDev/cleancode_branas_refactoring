import Passenger from "../../src/domain/passenger";

test("Deve criar um passageiro", () => {
  const passenger = Passenger.create("John Doe", "john.doe@test.com", "83432616074");
  expect(passenger.passengerId).toBeDefined();
  expect(passenger.name).toBe("John Doe");
  expect(passenger.email.value).toBe("john.doe@test.com");
  expect(passenger.document.value).toBe("83432616074");
});

test("Não pode criar um passageiro com cpf inválido", () => {
  expect(() => Passenger.create("John Doe", "john.doe@test.com", "8343261607")).toThrowError("Invalid CPF");
});

test("Não pode criar um passageiro com email inválido", () => {
  expect(() => Passenger.create("John Doe", "john.doe@test", "83432616074")).toThrowError("Invalid email");
});
