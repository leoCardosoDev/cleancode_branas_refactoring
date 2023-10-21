import TokenGenerator from "../../domain/token/token_generator"

export default class GetSession {
  async execute (input: Input): Promise<Output> {
    const payload = TokenGenerator.verify('secret', input.token)
    return {
      email: payload.email
    }
  }
}

type Output = {
  email:string
}

type Input = {
  token: string
}
