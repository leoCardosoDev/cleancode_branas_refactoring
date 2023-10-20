import RepositoryFactory from "../../application/factory/repository_factory";
import TransactionRepository from "../../application/repository/transaction_repository";
import DatabaseConnection from "../database/database_connection"
import TransactionRepositoryDatabase from "../repository/transaction_repository_database";

export default class RepositoryFactoryDatabase implements RepositoryFactory {

  constructor (readonly connection: DatabaseConnection) {}
  createTransactionRepository(): TransactionRepository {
    return new TransactionRepositoryDatabase(this.connection)
  }
}
