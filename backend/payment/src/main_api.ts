import PgPromiseAdapter from "./infra/database/pg_promise_adapter";
import MainController from "./infra/http/main_controller";
import ExpressAdapter from "./infra/http/express_adapter";
import Registry from "./infra/dependency_injection/register";
import TransactionRepositoryDatabase from "./infra/repository/transaction_repository_database";
import ProcessPayment from "./application/usecase/process_payment";
import PayPalGateway from "./infra/gateway/paypal_gateway";
import GetTransaction from "./application/usecase/get_transaction";

const connection = new PgPromiseAdapter();
const transactionRepository = new TransactionRepositoryDatabase(connection);
const httpServer = new ExpressAdapter();
const register = Registry.getInstance()
const paymentGateway = new PayPalGateway()
const processPayment = new ProcessPayment(transactionRepository, paymentGateway)
const getTransaction = new GetTransaction(transactionRepository)
register.provide('processPayment', processPayment)
register.provide('getTransaction', getTransaction)
new MainController(httpServer);
httpServer.listen(3001);
