export default interface PassengerGateway {
  save(passenger: any): Promise<any>
}
