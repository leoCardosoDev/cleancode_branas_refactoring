import CPF from "../../src/domain/cpf";

test.each([
  "83432616074",
  "74587887803",
  "87175659520"
])("Deve testar os cpfs válidos", (value: string) => {
  const cpf = new CPF(value);
  expect(cpf.value).toBe(value);
});

test.each([
  "83432616076",
  "99999999999",
  "834326160",
  ""
])("Deve testar os cpfs inválidos", (value: string) =>  {
  expect(() => new CPF(value)).toThrowError("Invalid CPF");
});
