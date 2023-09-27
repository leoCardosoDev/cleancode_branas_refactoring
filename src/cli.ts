// @ts-nocheck
import CreatePassenger from "./application/usecase/create_passenger";

process.stdin.on("data", async function (chunk) {
  const command = chunk.toString().replace(/\n/g, "");
  if(command.startsWith("create-passenger")){
    try {
      const [name, email, document] = command.replace("create-passenger ", "").split(" ");
      const usecase = await CreatePassenger();
      const output = usecase.execute({name, email, document});
      console.log(output);
    } catch (error: any) {
      console.log(error.message)
    }
  }
});
