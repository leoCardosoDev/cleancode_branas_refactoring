import Transaction from "../../domain/transaction/transaction";
import PaymentGateway from "../gateway/payment_gateway";
import TransactionRepository from "../repository/transaction_repository";

export default class ProcessPayment {

  constructor(readonly transactionRepository: TransactionRepository, readonly paymentGateway: PaymentGateway) {
  }

  async execute(input: Input): Promise<Output> {
    const outputPaymentGateway = await this.paymentGateway.createTransaction(input)
    const transaction = new Transaction(outputPaymentGateway.transactionId, input.name, input.email, input.amount)
    await this.transactionRepository.save(transaction)
    return {
      transactionId: transaction.transactionId
    }
  }
}

type Input = {
  name: string,
  email: string,
  amount: number
}

type Output = {
  transactionId: string
}
