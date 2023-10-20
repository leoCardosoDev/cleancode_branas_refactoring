import Transaction from "../../domain/transaction/transaction";

export default interface TransactionRepository {
  save(transaction: Transaction): Promise<void>
  get(transactionId: string): Promise<Transaction>
}
