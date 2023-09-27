import CarPlate from "./car_plate";
import CPF from "./cpf";
import Email from "./email";
import UUIDGenetator from "./uuid_generator";

export default class Driver {
  document: CPF;
  email: Email;
  carPlate: CarPlate;
  constructor (readonly driverId: string, readonly name: string, email: string, document: string, carPlate: string){
    this.document = new CPF(document);
    this.email = new Email(email);
    this.carPlate = new CarPlate(carPlate);
  }
  static create(name: string, email: string, document: string, carPlate: string) {
    const driverId = UUIDGenetator.create();
    return new Driver(driverId, name, email, document, carPlate);
  }
}
