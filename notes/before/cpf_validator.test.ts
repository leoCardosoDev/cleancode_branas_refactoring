import { validateCpf } from "./cpf_validator";

test.each([
  "83432616074",
  "74587887803",
  "87175659520"
])("Deve testar os cpfs válidos", (cpf: string) => {
  const isValid = validateCpf(cpf);
  expect(isValid).toBeTruthy();
});

test.each([
  "83432616076",
  "99999999999",
  "834326160",
  ""
])("Deve testar os cpfs inválidos", (cpf: string) =>  {
  const isValid = validateCpf(cpf);
  expect(isValid).toBeFalsy();
});
