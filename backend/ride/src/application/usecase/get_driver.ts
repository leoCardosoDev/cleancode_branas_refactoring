import DriverRepository from "../repository/driver_repository";

export default class GetDriver {
  constructor(readonly driverRepository: DriverRepository){}

  async execute(input: Input): Promise<Output> {  
    const driveData = await this.driverRepository.get(input.driverId);
    return {
      driverId: driveData.driverId,
      name: driveData.name,
      email: driveData.email.value,
      document: driveData.document.value,
      carPlate: driveData.carPlate.value
    };
  }
}

type Input = {
  driverId: string
}

type Output = {
  driverId: string,
  name: string,
  email: string,
  document: string,
  carPlate: string
}
