import UserRepository from "../repository/user_repository";

export default class Login {

  constructor (readonly userRepository: UserRepository) {}

  async execute (input: Input): Promise<Output> {
    const user = await this.userRepository.getByEmail(input.email)
    if (user.validatePassword(input.password)) {
      return {
        token: '123'
      }
    }
    throw new Error('Authentication failed')
  }

}

type Input = {
  email: string,
  password: string
}

type Output = {
  token: string
}
