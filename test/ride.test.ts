import Ride from "../src/ride";
test("Deve fazer o calculo do preço de uma corrida durante o dia", () => {
  const ride = new Ride();
  ride.addSegment(10, new Date("2021-03-01T10:00:00"))
  expect(ride.calculate()).toBe(21);
});

test("Deve fazer o calculo do preço de uma corrida durante a noite", () => {
  const ride = new Ride();
  ride.addSegment(10, new Date("2021-03-01T23:00:00"))
  expect(ride.calculate()).toBe(39);
});

test("Deve fazer o calculo do preço de uma corrida no Domingo de dia", () => {
  const ride = new Ride();
  ride.addSegment(10, new Date("2021-03-07T10:00:00"))
  expect(ride.calculate()).toBe(29);
});

test("Deve fazer o calculo do preço de uma corrida no Domingo de noite", () => {
  const ride = new Ride();
  ride.addSegment(10, new Date("2021-03-07T23:00:00"))
  expect(ride.calculate()).toBe(50);
});

test("Deve retornar -1 se a distancia for inválida", () => {
  const ride = new Ride();
  expect(() => ride.addSegment(-10, new Date("2021-03-07T23:00:00"))).toThrow(new Error("Invalid distance"));
});

test("Deve retornar -2 se a data for inválida", () => {
  const ride = new Ride();
  expect(() => ride.addSegment(10, new Date("invalid_data"))).toThrow(new Error("Invalid Date"));
});

test("Deve fazer o calculo de uma corrida durante o dia com preço minimo", () => {
  const ride = new Ride();
  ride.addSegment(3, new Date("2021-03-01T10:00:00"))
  expect(ride.calculate()).toBe(10);
});

test("Deve fazer o calculo do preço de uma corrida com multlipos segmentos", () => {
  const ride = new Ride();
  ride.addSegment(10, new Date("2021-03-01T10:00:00"))
  ride.addSegment(10, new Date("2021-03-01T10:00:00"))
  expect(ride.calculate()).toBe(42);
});
