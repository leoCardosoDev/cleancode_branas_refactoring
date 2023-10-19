import CarPlate from "../../src/domain/driver/car_plate";

test("Deve testar uma placa válida", () => {
  const carPlate = new CarPlate("AAA9999");
  expect(carPlate).toBeDefined();
});

test("Não deve testar uma placa inválida", () => {
 expect(() => new CarPlate("AAA999")).toThrowError("Invalid car plate");
});
