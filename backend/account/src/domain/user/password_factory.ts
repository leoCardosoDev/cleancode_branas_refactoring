import Pbkdf2Password from "./pbkdf2_password";
import PlainPassword from "./plain_password";
import Sha1Password from "./sha1_password";

export default class PasswordFactory {
  static create (passwordType: string) {
    if (passwordType === 'plain') return PlainPassword
    if (passwordType === 'sha1') return Sha1Password
    if (passwordType === 'pbkdf2') return Pbkdf2Password
    throw new Error()
  }
}
