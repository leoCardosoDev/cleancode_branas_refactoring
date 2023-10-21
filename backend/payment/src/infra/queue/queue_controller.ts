import ProcessPayment from "../../application/usecase/process_payment";
import inject from "../dependency_injection/inject";
import Queue from "./queue";

export default class QueueController {
  @inject('processPayment')
  processPayment?: ProcessPayment

  constructor (readonly queue: Queue) {
    queue.consume('rideCompleted', async (input: any) => {
      const output = await this.processPayment?.execute(input)
      console.log(output)
    })
  }
}
