import Transaction from "../../domain/transaction/transaction";
import PaymentGateway from "../gateway/payment_gateway";
import TransactionRepository from "../repository/transaction_repository";

export default class GetTransaction {

  constructor(readonly transactionRepository: TransactionRepository) {
  }

  async execute(input: Input): Promise<Output> {
    const transaction = await this.transactionRepository.get(input.transactionId)
    return {
      transactionId: transaction.transactionId,
      name: transaction.name,
      email: transaction.email,
      amount: transaction.amount
    }
  }
}


type Input = {
  transactionId: string
}

type Output = {
  transactionId: string,
  name: string,
  email: string,
  amount: number
}
