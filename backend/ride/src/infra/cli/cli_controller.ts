import CreatePassenger from "../../application/usecase/create_passenger";
import InputOutput from "./input_output";

export default class CLIController {
  constructor(inputOutput: InputOutput, createPassenger: CreatePassenger) {
    try {
      inputOutput.on("create-passenger", async function (params:any) {
        const [name, email, document] = params.split(" ");
        const output = await createPassenger.execute({name, email, document});
        inputOutput.write(JSON.stringify(output));
      });
    } catch (e: any) {
      inputOutput.write(e.message);
    }
   
  }
}
