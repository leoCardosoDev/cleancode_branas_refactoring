import CreatePassenger from "../../application/usecase/create_passenger";
import inject from "../dependency_injection/inject";
import Queue from "./queue";

export default class QueueController {
  @inject('createPassenger')
  createPassenger?: CreatePassenger

  constructor (readonly queue: Queue) {
    queue.consume('createPassenger', async (input: any) => {
      const output = await this.createPassenger?.execute(input)
      console.log(output)
    })
  }
}
