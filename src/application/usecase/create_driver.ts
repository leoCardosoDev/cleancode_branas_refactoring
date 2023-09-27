import { validateCpf } from "../../../notes/before/cpf_validator";
import crypto from "crypto"
import DriverRepository from "../repository/driver_repository";


export default class CreateDriver {
  constructor(readonly driverRepository: DriverRepository){}
  async execute(input: Input): Promise<Output> {
    const driverId = crypto.randomUUID();
    if(!validateCpf(input.document)) throw new Error("Invalid CPF");
    await this.driverRepository.save(Object.assign(input, {driverId}));
    return {
      driverId
    };
  }
}
type Input = {
  name: string,
  email: string,
  document: string,
  carPlate: string
}

type Output = {
  driverId: string
}
