import Ride from "../../src/domain/ride/ride";

test("Deve fazer o calculo do preço de uma corrida durante o dia", () => {
  const ride = new Ride();
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"));
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-01T10:00:00"));
  expect(ride.calculate()).toBe(21);
});

test("Deve fazer o calculo do preço de uma corrida durante a noite", () => {
  const ride = new Ride();
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T23:00:00"));
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-01T23:00:00"));
  expect(ride.calculate()).toBe(39);
});

test("Deve fazer o calculo do preço de uma corrida no Domingo de dia", () => {
  const ride = new Ride();
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-07T10:00:00"));
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-07T10:00:00"));
  expect(ride.calculate()).toBe(29);
});

test("Deve fazer o calculo do preço de uma corrida no Domingo de noite", () => {
  const ride = new Ride();
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-07T23:00:00"));
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-07T23:00:00"));
  expect(ride.calculate()).toBe(50);
});

test("Deve retornar -2 se a data for inválida", () => {
  const ride = new Ride();
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("invalid_data"));
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("invalid_data"));
  expect(() => ride.calculate()).toThrow(new Error("Invalid Date"));
});

test("Deve fazer o calculo de uma corrida durante o dia com preço minimo", () => {
  const ride = new Ride();
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"));
  ride.addPosition(-27.579020277800876, -48.50838017206791, new Date("2021-03-01T10:00:00"));
  expect(ride.calculate()).toBe(10);
});
