import Coord from "../../src/domain/distance/coord";
import Ride from "../../src/domain/ride/ride";

test("Deve fazer o calculo do preço de uma corrida durante o dia", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"));
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-01T10:00:00"));
  expect(ride.calculate()).toBe(21);
});

test("Deve fazer o calculo do preço de uma corrida durante a noite", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T23:00:00"));
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-01T23:00:00"));
  expect(ride.calculate()).toBe(39);
});

test("Deve fazer o calculo do preço de uma corrida no Domingo de dia", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-07T10:00:00"));
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-07T10:00:00"));
  expect(ride.calculate()).toBe(29);
});

test("Deve fazer o calculo do preço de uma corrida no Domingo de noite", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-07T23:00:00"));
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-07T23:00:00"));
  expect(ride.calculate()).toBe(50);
});

test("Deve retornar -2 se a data for inválida", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("invalid_data"));
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("invalid_data"));
  expect(() => ride.calculate()).toThrow(new Error("Invalid Date"));
});

test("Deve fazer o calculo de uma corrida durante o dia com preço minimo", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"));
  ride.addPosition(-27.579020277800876, -48.50838017206791, new Date("2021-03-01T10:00:00"));
  expect(ride.calculate()).toBe(10);
});

test("Deve solicitar uma corrida", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  expect(ride.status).toBe("requested");
});

test("Deve aceitar uma corrida", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.accept("", new Date("2021-03-01T10:10:00"));
  expect(ride.status).toBe("accepted");
});

test("Deve iniciar uma corrida", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.start(new Date("2021-03-01T10:20:00"));
  expect(ride.status).toBe("in_progress");
});

test("Deve finalizar uma corrida", () => {
  const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
  ride.end(new Date("2021-03-01T10:30:00"));
  expect(ride.status).toBe("completed");
});
