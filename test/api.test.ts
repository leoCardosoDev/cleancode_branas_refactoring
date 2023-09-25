import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
}

test("Deve fazer o calculo do preço de uma corrida durante o dia", async () => {
  const input = {
    segments: [
      {distance: 10, date: "2021-03-01T10:00:00"}
    ]
  };
  const response = await axios.post("http://localhost:3000/calculate_ride", input);
  const output = response.data;
  expect(output.price).toBe(21);
});

test("Deve lançar um erro se a distancia for invalida", async () => {
  const input = {
    segments: [
      {distance: -10, date: "2021-03-01T10:00:00"}
    ]
  };
  const response = await axios.post("http://localhost:3000/calculate_ride", input);
  expect(response.status).toBe(422)
  const output = response.data;
  expect(output).toBe("Invalid distance");
});
