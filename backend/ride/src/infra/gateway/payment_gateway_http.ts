import PaymentGateway, { Input } from "../../application/gateway/payment_gateway";
import HttpClient from "../http/http_client";

export default class PaymentGatewayHttp implements PaymentGateway {
  constructor (readonly httpClient: HttpClient) {}

  async process(input: Input): Promise<void> {
    await this.httpClient.post('http://localhost:3001/process_payment', input)
  }
}
