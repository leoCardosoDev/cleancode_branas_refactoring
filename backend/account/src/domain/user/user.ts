import UUIDGenetator from "../identity/uuid_generator";
import Email from "../person/email";
import PasswordFactory from "./password_factory";
import Password from "./password";

export default class User {

  private constructor (readonly userId: string, readonly email: Email, readonly password: Password, readonly passwordType: string) {}

  static create (email: string, password: string, passwordType: string) {
    const userId = UUIDGenetator.create()
    return new User(userId, new Email(email), PasswordFactory.create(passwordType).create(password), passwordType)
  }

  static restore (userId: string, email: string, password: string, passwordType: string, salt: string = ''){
    return new User(userId, new Email(email), PasswordFactory.create(passwordType).restore(password, salt), passwordType)
  }

  validatePassword (password: string) {
    return this.password.validate(password)
  }
}
