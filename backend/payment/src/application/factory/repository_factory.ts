import TransactionRepository from "../repository/transaction_repository";

export default interface RepositoryFactory {
  createTransactionRepository(): TransactionRepository
}
