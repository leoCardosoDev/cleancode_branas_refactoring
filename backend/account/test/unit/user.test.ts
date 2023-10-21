import UUIDGenetator from "../../src/domain/identity/uuid_generator"
import User from "../../src/domain/user/user"

test('Deve criar um novo usuario com senha plain', () => {
  const user = User.create('john.doe@gmail.com', '123456', 'plain')
  expect(user.userId).toBeDefined()
  expect(user.email.value).toBe('john.doe@gmail.com')
  expect(user.password.value).toBe('123456')
})

test('Deve restaurar um usuario existente', () => {
  const userId = UUIDGenetator.create()
  const user = User.restore(userId, 'john.doe@gmail.com', '123456', 'plain')
  expect(user.userId).toBeDefined()
  expect(user.email.value).toBe('john.doe@gmail.com')
  expect(user.password.value).toBe('123456')
})

test('Deve criar um novo usuario com senha encriptada', () => {
  const user = User.create('john.doe@gmail.com', '123456', 'sha1')
  expect(user.userId).toBeDefined()
  expect(user.email.value).toBe('john.doe@gmail.com')
  expect(user.password.value).toBe('7c4a8d09ca3762af61e59520943dc26494f8941b')
})

test('Deve validar um usuario existente com senha plain', () => {
  const userId = UUIDGenetator.create()
  const user = User.restore(userId, 'john.doe@gmail.com', '123456', 'plain')
  expect(user.validatePassword('123456')).toBeTruthy()
})

test('Deve validar um usuario existente com senha encriptada', () => {
  const userId = UUIDGenetator.create()
  const user = User.restore(userId, 'john.doe@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'sha1')
  expect(user.validatePassword('123456')).toBeTruthy()
})

test('Deve criar um novo usuario com senha encriptada com pbkdf2', () => {
  const user = User.create('john.doe@gmail.com', '123456', 'pbkdf2')
  expect(user.userId).toBeDefined()
  expect(user.email.value).toBe('john.doe@gmail.com')
})

  test('Deve validar um usuario existente com senha encriptada com pbkdf2', () => {
    const userId = UUIDGenetator.create()
    const salt = 'f227dd01e279a5cf4fd9d90a79d8710051a83817'
    const password = 'ce9e932a3d8047116b48acd0a5d39199c8b96a802a09824f8e4440aca112066d27ff9722ee4857addcef7a0faf011dd78a1dc2d09410d84f36f217f647fefd76'
    const user = User.restore(userId, 'john.doe@gmail.com', password, 'pbkdf2', salt)
    expect(user.validatePassword('123456')).toBe(true)
  })
