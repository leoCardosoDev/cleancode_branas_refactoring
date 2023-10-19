export default interface DriverGateway {
    create(driver: any): Promise<any>
}

export type CreateDriverInput = {
  name: string,
  email: string,
  document: string,
  carPlate: string
}
