import PgPromiseAdapter from "./infra/database/pg_promise_adapter";
import MainController from "./infra/http/main_controller";
import ExpressAdapter from "./infra/http/express_adapter";
import Registry from "./infra/dependency_injection/register";
import TransactionRepositoryDatabase from "./infra/repository/transaction_repository_database";
import ProcessPayment from "./application/usecase/process_payment";
import PayPalGateway from "./infra/gateway/paypal_gateway";

const connection = new PgPromiseAdapter();
const transactionRepository = new TransactionRepositoryDatabase(connection);
const httpServer = new ExpressAdapter();
const register = Registry.getInstance()
const paymentGateway = new PayPalGateway()
const processPayment = new ProcessPayment(transactionRepository, paymentGateway)
register.provide('processPayment', processPayment)
new MainController(httpServer);
httpServer.listen(3001);
