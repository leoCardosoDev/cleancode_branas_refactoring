import TransactionRepository from "../../application/repository/transaction_repository";
import Transaction from "../../domain/transaction/transaction";
import DatabaseConnection from "../database/database_connection";

export default class TransactionRepositoryDatabase implements TransactionRepository {

  constructor(readonly connection: DatabaseConnection) {}

  async save(transaction: Transaction): Promise<void> {
    await this.connection.query('insert into cccat12.transaction (transaction_id, name, email, amount) values ($1, $2, $3, $4)',[
      transaction.transactionId, transaction.name, transaction.email, transaction.amount
    ])
  }

  async get(transactionId: string): Promise<Transaction> {
    const [transactionData] = await this.connection.query('select * from cccat12.transaction where transaction_id = $1', [transactionId])
    return new Transaction(transactionData.transactionId, transactionData.name, transactionData.email, parseFloat(transactionData.amount))
  }
  
}
