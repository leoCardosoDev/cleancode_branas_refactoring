import { validateCpf } from "../../../notes/before/cpf_validator";
import pgp from "pg-promise";
import crypto from "crypto"

export default class CreatePassenger {
  constructor(){}
  async execute(input: Input): Promise<Output> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const passengerId = crypto.randomUUID();
    if(!validateCpf(input.document)) throw new Error("Invalid CPF");
    await connection.query("insert into cccat12.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)", [passengerId, input.name, input.email, input.document]);
    await connection.$pool.end();
    return {
      passengerId
    };
  }
}
type Input = {
  name: string,
  email: string,
  document: string
}

type Output = {
  passengerId: string
}
