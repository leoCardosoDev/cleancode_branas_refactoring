import CPF from "../person/cpf";
import Email from "../person/email";
import UUIDGenetator from '../identity/uuid_generator'


export default class Passenger {
  document: CPF;
  email: Email;
  constructor (readonly passengerId: string, readonly name: string, email: string, document: string){
    this.document = new CPF(document);
    this.email = new Email(email);
  }
  static create(name: string, email: string, document: string) {
    const passengerId = UUIDGenetator.create();
    return new Passenger(passengerId, name, email, document);
  }

}
