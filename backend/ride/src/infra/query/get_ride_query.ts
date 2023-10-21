import DatabaseConnection from "../database/database_connection";

export default class GetRideQuery {
  constructor (readonly connection: DatabaseConnection) {}

  async execute (rideId: string) {
    const [data] = await this.connection.query('select r.ride_id, r.status, p.name as passenger_name, d.name as driver_name from cccat12.ride r join cccat12.passenger p using (passenger_id) left join cccatt12.driver d using (driver_id) where ride_id = $1', [rideId])
    return data
  }
}
