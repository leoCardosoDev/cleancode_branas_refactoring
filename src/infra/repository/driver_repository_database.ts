import DriverRepository from "../../application/repository/driver_repository";
import Driver from "../../domain/driver";
import DatabaseConnection from "../database/database_connection";

export default class DriverRepositoryDatabase implements DriverRepository {
  constructor(readonly connection: DatabaseConnection) {}
  async save(driver: Driver) {
    await this.connection.query("insert into cccat12.driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driver.driverId, driver.name, driver.email.value, driver.document.value, driver.carPlate.value]);
  }

  async get (driverId: string) {
    const [driverData] = await this.connection.query("select * from cccat12.driver where driver_id = $1",[driverId]);
    return new Driver(driverData.driver_id, driverData.name, driverData.email, driverData.document, driverData.car_plate);
  }
}
