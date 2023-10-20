import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
}

test("Deve cadastrar um passageiro", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74"
  };
  const response = await axios.post("http://localhost:3000/passengers", input);
  const output = response.data;
  expect(output.passengerId).toBeDefined();
});

test("Não deve cadastrar um passageiro com cpf invalido", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-76"
  };
  const response = await axios.post("http://localhost:3000/passengers", input);
  expect(response.status).toBe(422)
  const output = response.data;
  expect(output).toBe("Invalid CPF");
});

test("Deve obter um passageiro", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74"
  };
  const responseCreatePassender = await axios.post("http://localhost:3000/passengers", input);
  const outputCreatePassender = responseCreatePassender.data;
  const response = await axios.get(`http://localhost:3000/passengers/${outputCreatePassender.passengerId}`);
  const output = response.data;
  expect(output.name).toBe("John Doe");
  expect(output.email).toBe("john.doe@test.com");
  expect(output.document).toBe("834.326.160-74");
});

test("Deve cadastrar um motorista", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74",
    carPlate: "AAA9999"
  };
  const response = await axios.post("http://localhost:3000/drivers", input);
  const output = response.data;
  expect(output.driverId).toBeDefined();
});

test("Deve obter um motorista", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74",
    carPlate: "AAA9999"
  };
  const responseCreateDriver = await axios.post("http://localhost:3000/drivers", input);
  const outputCreateDriver = responseCreateDriver.data;
  const response = await axios.get(`http://localhost:3000/drivers/${outputCreateDriver.driverId}`);
  const output = response.data;
  expect(output.name).toBe("John Doe");
  expect(output.email).toBe("john.doe@test.com");
  expect(output.document).toBe("834.326.160-74");
  expect(output.carPlate).toBe("AAA9999");
});

test("Não deve cadastrar um motorista com cpf invalido", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-7",
    carPlate: "AAA9999"
  };
  const response = await axios.post("http://localhost:3000/drivers", input);
  expect(response.status).toBe(422)
  const output = response.data;
  expect(output).toBe("Invalid CPF");
});
