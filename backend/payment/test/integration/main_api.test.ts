import axios from 'axios'

test('Deve processar um pagamento', async () => {
  const input = {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    amount: 30
  }
  const response = await axios.post('http://localhost:3001/process_payment', input)
  const processPaymentOutput = response.data
  expect(processPaymentOutput.transactionId).toBeDefined()
})
