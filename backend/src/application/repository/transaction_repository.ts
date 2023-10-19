import Transaction from "../../domain/transaction/transaction";

export default interface TransactionRepository {
  save(transaction: Transaction): Promise<void>
}
