import Queue from "./queue";

export default class QueueController {


  constructor (readonly queue: Queue) {
    queue.consume('createPassenger', async (input: any) => {
    })
  }
}
