import Passenger from "../../src/domain/passenger"

test('Não deve criar um passageiro inválido', () => {
  expect(() => new Passenger('', '', '', '')).toThrow(new Error('Invalid name'))
})
