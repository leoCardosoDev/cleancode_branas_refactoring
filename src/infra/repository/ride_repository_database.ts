import RideRepository from "../../application/repository/ride_repository";
import Coord from "../../domain/distance/coord";
import Ride from "../../domain/ride/ride";
import DatabaseConnection from "../database/database_connection";

export default class RideRepositoryDatabase implements RideRepository {

  constructor(readonly connection: DatabaseConnection) {}

  async save(ride: Ride) {
    await this.connection.query("insert into cccat12.ride(ride_id, passenger_id, from_lat, from_long, to_lat, to_long, status, request_date) values ($1, $2, $3, $4, $5, $6, $7, $8)",
    [ride.rideId, ride.passengerId, ride.from.lat, ride.from.long, ride.to.lat, ride.to.long, ride.status, ride.requestDate]);
  }

  async get(rideId: string): Promise<Ride> {
    const [rideData] = await this.connection.query("select * from cccat12.ride where ride_id = $1", [rideId]);
    return new Ride(rideData.ride_id, rideData.passenger_id, new Coord(parseFloat(rideData.from_lat), parseFloat(rideData.from_long)), new Coord(parseFloat(rideData.to_lat), parseFloat(rideData.to_long)), rideData.status, rideData.request_date)
  }
  
}
