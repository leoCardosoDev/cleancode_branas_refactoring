import UserRepository from '../../application/repository/user_repository'
import User from '../../domain/user/user'
import DatabaseConnection from '../database/database_connection'

export default class UserRepositoryDatabase implements UserRepository {
  constructor(readonly connection: DatabaseConnection) {}
  async save(user: User) {
    await this.connection.query("insert into cccat12.user (user_id, email, password, password_type, salt) values ($1, $2, $3, $4, $5)", [user.userId, user.email.value, user.password.value, user.passwordType, user.password.salt]);
  }
}
