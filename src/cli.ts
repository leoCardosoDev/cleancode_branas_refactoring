// @ts-nocheck
import CreatePassenger from "./application/usecase/create_passenger";
import PgPromiseAdapter from "./infra/database/pg_promise_adapter";

process.stdin.on("data", async function (chunk) {
  const command = chunk.toString().replace(/\n/g, "");
  if(command.startsWith("create-passenger")){
    try {
      const [name, email, document] = command.replace("create-passenger ", "").split(" ");
      const connection = new PgPromiseAdapter();
      const usecase = await CreatePassenger(connection);
      const output = usecase.execute({name, email, document});
      console.log(output);
    } catch (error: any) {
      console.log(error.message)
    }
  }
});
