import Driver from "../../src/domain/driver"

test('Não deve criar um motorista com nome inválido', () => {
  expect(()=> new Driver('', '', '', '', '')).toThrow(new Error('Invalid name'))
})

test('Não deve criar um motorista com email inválido', () => {
  expect(()=> new Driver('', 'John Doe', '', '', '')).toThrow(new Error('Invalid email'))
})

test('Não deve criar um motorista com CPF inválido', () => {
  expect(()=> new Driver('', 'John Doe', 'john.doe@gmail.com', '834.326.160-75', '')).toThrow(new Error('Invalid CPF'))
})

test('Não deve criar um motorista com placa do carro inválida', () => {
  expect(()=> new Driver('', 'John Doe', 'john.doe@gmail.com', '834.326.160-74', 'AAA999')).toThrow(new Error('Invalid car plate'))
})
