import PaymentGateway, { Input, Output } from '../../application/gateway/payment_gateway'
import crypto from 'crypto'

export default class PayPalGateway implements PaymentGateway {

  async createTransaction (input: Input): Promise<Output> {
    return {
      transactionId: crypto.randomUUID()
    }
  }
}
