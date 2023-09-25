import { calculate } from "../src/ride_calculator";
test("Deve fazer o calculo do preço de uma corrida durante o dia", () => {
  const segments = [{distance: 10, date: new Date("2021-03-01T10:00:00")}];
  const price = calculate(segments);
  expect(price).toBe(21);
});

test("Deve fazer o calculo do preço de uma corrida durante a noite", () => {
  const segments = [{distance: 10, date: new Date("2021-03-01T23:00:00")}];
  const price = calculate(segments);
  expect(price).toBe(39);
});

test("Deve fazer o calculo do preço de uma corrida no Domingo de dia", () => {
  const segments = [{distance: 10, date: new Date("2021-03-07T10:00:00")}];
  const price = calculate(segments);
  expect(price).toBe(29);
});

test("Deve fazer o calculo do preço de uma corrida no Domingo de noite", () => {
  const segments = [{distance: 10, date: new Date("2021-03-07T23:00:00")}];
  const price = calculate(segments);
  expect(price).toBe(50);
});

test("Deve retornar -1 se a distancia for inválida", () => {
  const segments = [{distance: -10, date: new Date("2021-03-01T10:00:00")}];
  const price = calculate(segments);
  expect(price).toBe(-1);
});

test("Deve retornar -2 se a data for inválida", () => {
  const segments = [{distance: 10, date: new Date("invalid_data")}];
  const price = calculate(segments);
  expect(price).toBe(-2);
});

test("Deve fazer o calculo de uma corrida durante o dia com preço minimo", () => {
  const segments = [{distance: 3, date: new Date("2021-03-01T10:00:00")}];
  const price = calculate(segments);
  expect(price).toBe(10);
});

test("Deve fazer o calculo do preço de uma corrida com multlipos segmentos", () => {
  const segments = [
    {distance: 10, date: new Date("2021-03-01T10:00:00")},
    {distance: 10, date: new Date("2021-03-01T10:00:00")},
  ];
  const price = calculate(segments);
  expect(price).toBe(42);
});
