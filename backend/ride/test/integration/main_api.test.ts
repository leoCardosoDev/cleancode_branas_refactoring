import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
}

test("Deve fazer o calculo do preço de uma corrida durante o dia", async () => {
  const input = {
    positions: [
      {lat: -27.584905257808835, long: -48.545022195325124, date: new Date("2021-03-01T10:00:00")},
      {lat: -27.496887588317275, long: -48.522234807851476, date: new Date("2021-03-01T10:00:00")}
    ]
  };
  const response = await axios.post("http://localhost:3000/calculate_ride", input);
  const output = response.data;
  expect(output.price).toBe(21);
});

test("Deve lançar um erro se a data for inválida", async () => {
  const input = {
    positions: [
      {lat: -27.584905257808835, long: -48.545022195325124, date: "invalid_date"},
      {lat: -27.496887588317275, long: -48.522234807851476, date: "invalid_date"}
    ]
  };
  const response = await axios.post("http://localhost:3000/calculate_ride", input);
  const output = response.data;
  expect(output).toBe("Invalid Date");
});

