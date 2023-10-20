import GetTransaction from "../../application/usecase/get_transaction";
import ProcessPayment from "../../application/usecase/process_payment";
import inject from "../dependency_injection/inject";
import HttpServer from "./http_server";

export default class MainController {
  @inject('processPayment')
  processPayment?: ProcessPayment
  @inject('getTransaction')
  getTransaction?: GetTransaction

  constructor(httpServer: HttpServer) {
    httpServer.on("post", "/process_payment", async (params: any, body: any) => {
      const output = await this.processPayment?.execute(body)
      return output;
    });

    httpServer.on("get", "/transaction/:{transactionId}", async (params: any, body: any) => {
      const output = await this.getTransaction?.execute({ transactionId: params.transactionId })
      return output;
    });
  }
}
