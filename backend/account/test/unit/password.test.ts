import PlainPassword from "../../src/domain/user/plain_password"
import Sha1Password from "../../src/domain/user/sha1_password"

test('Deve criar um password plain', () => {
  const password = PlainPassword.create('123456')
  expect(password.validate('123456')).toBeTruthy()
})

test('Deve criar um password Sha1', () => {
  const password = Sha1Password.create('123456')
  expect(password.validate('123456')).toBe(true)
})
