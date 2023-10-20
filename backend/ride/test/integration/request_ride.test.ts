import GetRide from "../../src/application/usecase/get_ride";
import RequestRide from "../../src/application/usecase/request_ride";
import PgPromiseAdapter from "../../src/infra/database/pg_promise_adapter";
import RepositoryFactoryDatabase from "../../src/infra/factory/repository_factory_database";
import AccountGatewayHttp from "../../src/infra/gateway/account_gateway_http";
import AxiosAdapter from "../../src/infra/http/axios_adapter";
import RideRepositoryDatabase from "../../src/infra/repository/ride_repository_database";

test("Deve solicitar uma corrida", async () => {
  const inputCreatePassenger = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74"
  };
  const connection = new PgPromiseAdapter();
  const accountGateway = new AccountGatewayHttp(new AxiosAdapter())
	const outputCreatePassenger = await accountGateway.createPassenger(inputCreatePassenger);
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
  }
  const requestRide = new RequestRide(new RideRepositoryDatabase(connection));
  const outputRequestRide = await requestRide.execute(inputRequestRide);
  expect(outputRequestRide.rideId).toBeDefined();
  await connection.close();
});

test("Deve obter uma corrida", async () => {
  const inputCreatePassenger = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74"
  };
  const connection = new PgPromiseAdapter();
  const accountGateway = new AccountGatewayHttp(new AxiosAdapter())
	const outputCreatePassenger = await accountGateway.createPassenger(inputCreatePassenger);
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
  }
  const requestRide = new RequestRide(new RideRepositoryDatabase(connection));
  const outputRequestRide = await requestRide.execute(inputRequestRide);
  const getRide = new GetRide(new RepositoryFactoryDatabase(connection));
  const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
  expect(outputGetRide.rideId).toBeDefined();
  expect(outputGetRide.status).toBe("requested");
  expect(outputGetRide.requestDate).toEqual(new Date("2021-03-01T10:00:00"));
  await connection.close();
});
