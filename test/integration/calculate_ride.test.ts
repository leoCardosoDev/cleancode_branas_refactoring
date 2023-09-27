import CalculateRide from "../../src/application/usecase/calculate_ride";

test("Deve fazer o calculo do preço de uma corrida durante o dia", async () => {
  const input = {
    segments: [
      { distance: 10, date: new Date("2021-03-01T10:00:00") }
    ]
  };
  const usecase = new CalculateRide()
  const output = await usecase.execute(input);
  expect(output.price).toBe(21);
});
