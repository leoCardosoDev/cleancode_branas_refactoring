import CreatePassenger from "../../src/application/usecase/create_passenger";
import GetSession from "../../src/application/usecase/get_session";
import Login from "../../src/application/usecase/login";
import PgPromiseAdapter from "../../src/infra/database/pg_promise_adapter";
import PassengerRepositoryDatabase from "../../src/infra/repository/passenger_repository_database";
import UserRepositoryDatabase from "../../src/infra/repository/user_repository_database";

test('Deve fazer o login', async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74",
    password: '123456'
  };
  const connection = new PgPromiseAdapter();
  const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase(connection), new UserRepositoryDatabase(connection));
  await createPassenger.execute(input)
  const login = new Login(new UserRepositoryDatabase(connection))
  const inputLogin = {
    email: "john.doe@test.com",
    password: '123456'
  }
  const outputLogin = await login.execute(inputLogin)
  expect(outputLogin.token).toBeDefined()
  await connection.close();
})

test('Deve fazer o login e validar se o usuário está logado', async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@test.com",
    document: "834.326.160-74",
    password: '123456'
  };
  const connection = new PgPromiseAdapter();
  const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase(connection), new UserRepositoryDatabase(connection));
  await createPassenger.execute(input)
  const login = new Login(new UserRepositoryDatabase(connection))
  const inputLogin = {
    email: "john.doe@test.com",
    password: '123456'
  }
  const outputLogin = await login.execute(inputLogin)
  expect(outputLogin.token).toBeDefined()
  const getSession = new GetSession()
  const outputGetSession = await getSession.execute({ token: outputLogin.token })
  expect(outputGetSession.email).toBe("john.doe@test.com")
  await connection.close();
})
