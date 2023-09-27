import { validate } from "./email_validator";

test("Deve retornar true se o email for válido", () => {
  const email = "john.doe@gmail.com";
  const isValid = validate(email);
  expect(isValid).toBeTruthy();
});

test("Deve retornar false se o email for inválido", () => {
  const email = "john.doe@gmail";
  const isValid = validate(email);
  expect(isValid).toBeFalsy();
});
