import UUIDGenetator from "../identity/uuid_generator";
import Email from "../person/email";
import crypto from 'crypto'

export default class User {

  private constructor (readonly userId: string, readonly email: Email, readonly password: string, readonly passwordType: string, readonly salt: string = '') {}

  static create (email: string, password: string, passwordType: string) {
    const userId = UUIDGenetator.create()
    let hashPassword
    let salt
    if (passwordType === 'plain') {
      hashPassword = password
    }
    if (passwordType === 'sha1') {
      hashPassword = crypto.createHash('sha1').update(password).digest('hex')
    }
    if (passwordType === 'pbkdf2') {
      salt = crypto.randomBytes(20).toString('hex')
      hashPassword = crypto.pbkdf2Sync(password, salt, 100, 64, 'sha512').toString('hex')
      console.log('salt = ', salt)
      console.log('password = ', hashPassword)
    }
    if (!hashPassword) throw new Error()
    return new User(userId, new Email(email), hashPassword, passwordType, salt)
  }

  static restore (userId: string, email: string, password: string, passwordType: string, salt: string = ''){
    return new User(userId, new Email(email), password, passwordType, salt)
  }

  validatePassword (password: string) {
    let hashPassword = ""
    if (this.passwordType === 'plain') {
      hashPassword = password
    }
    if (this.passwordType === 'sha1') {
      hashPassword = crypto.createHash('sha1').update(password).digest('hex')
    }
    if (this.passwordType === 'pbkdf2') {
      hashPassword = crypto.pbkdf2Sync(password, this.salt, 100, 64, 'sha512').toString('hex')
    }
    if (!hashPassword) throw new Error()
    return this.password === hashPassword
  }

}
