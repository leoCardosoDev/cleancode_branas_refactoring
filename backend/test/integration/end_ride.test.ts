import AcceptRide from "../../src/application/usecase/accept_ride";
import CreateDriver from "../../src/application/usecase/create_driver";
import CreatePassenger from "../../src/application/usecase/create_passenger";
import EndRide from "../../src/application/usecase/end_ride";
import GetRide from "../../src/application/usecase/get_ride";
import RequestRide from "../../src/application/usecase/request_ride";
import StartRide from "../../src/application/usecase/start_ride";
import PgPromiseAdapter from "../../src/infra/database/pg_promise_adapter";
import DriverRepositoryDatabase from "../../src/infra/repository/driver_repository_database";
import PassengerRepositoryDatabase from "../../src/infra/repository/passenger_repository_database";
import RideRepositoryDatabase from "../../src/infra/repository/ride_repository_database";

test("Deve finalizar uma corrida", async function () {
	const inputCreatePassenger = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074"
	};
	const connection = new PgPromiseAdapter();
	const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase(connection));
	const outputCreatePassenger = await createPassenger.execute(inputCreatePassenger);

	const inputRequestRide = {
		passengerId: outputCreatePassenger.passengerId,
		from: {
			lat: -27.584905257808835,
			long: -48.545022195325124
		},
		to: {
			lat: -27.496887588317275,
			long: -48.522234807851476
		},
		date: new Date("2021-03-01T10:00:00")
	};
	const requestRide = new RequestRide(new RideRepositoryDatabase(connection));
	const outputRequestRide = await requestRide.execute(inputRequestRide);

	const inputCreateDriver = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074",
		carPlate: "AAA9999"
	};
	const createDriver = new CreateDriver(new DriverRepositoryDatabase(connection));
	const outputCreateDriver = await createDriver.execute(inputCreateDriver);

	const inputAcceptRide = {
		rideId: outputRequestRide.rideId,
		driverId: outputCreateDriver.driverId,
		date: new Date("2021-03-01T10:10:00")
	};
	const acceptRide = new AcceptRide(new RideRepositoryDatabase(connection));
	await acceptRide.execute(inputAcceptRide);

  const inputStartRide = {
    rideId: outputRequestRide.rideId,
    date: new Date("2021-03-01T10:20:00")
  };
  const startRide = new StartRide(new RideRepositoryDatabase(connection));
  await startRide.execute(inputStartRide);

  const inputEndRide = {
    rideId: outputRequestRide.rideId,
    date: new Date("2021-03-01T10:30:00")
  };
  const endRide = new EndRide(new RideRepositoryDatabase(connection));
  await endRide.execute(inputEndRide);

	const getRide = new GetRide(new RideRepositoryDatabase(connection));
	const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
	expect(outputGetRide.driverId).toBe(outputCreateDriver.driverId);
	expect(outputGetRide.status).toBe("completed");
	expect(outputGetRide.endDate).toEqual(new Date("2021-03-01T10:30:00"));
	await connection.close();
});
