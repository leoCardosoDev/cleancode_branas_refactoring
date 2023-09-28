import Email from "../../src/domain/person/email";

test("Deve retonar true se o email é válido", () => {
  const email = "john.doe@test.com";
  const input = new Email(email);
  expect(input).toBeTruthy();
});

test("Deve lançar uma exception se o email for inválido", () => {
  const email = "john.doe@test";
  expect(() => new Email(email)).toThrowError("Invalid email")
});
