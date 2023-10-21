import UsecaseFactory from "../../application/factory/usecase_factory";
import HttpServer from "./http_server";
import inject from "../dependency_injection/inject";
import CreatePassenger from "../../application/usecase/create_passenger";
import Queue from "../queue/queue";

export default class MainController {
  @inject('createPassenger')
  createPassenger?: CreatePassenger


  constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory, queue: Queue) {
    httpServer.on("post", "/passengers", async (params: any, body: any) => {
      const output = await this.createPassenger?.execute(body)
      return output;
    });

    httpServer.on("post", "/passengersAsync", async (params: any, body: any) => {
      await queue.publish('createPassenger', body)
    });
    
    httpServer.on("get", "/passengers/:{passengerId}", async function(params: any, body: any){
      const output = await usecaseFactory.createGetPassenger().execute({passengerId: params.passengerId});
      return output;
    });
    
    httpServer.on("post", "/drivers", async function(params: any, body: any) {
      const output = await usecaseFactory.createCreateDriver().execute(body)
      return output;
    });
    
    httpServer.on("get", "/drivers/:{driverId}", async function(params: any, body: any){
      const output = await usecaseFactory.createGetDriver().execute({driverId: params.driverId});
      return output;
    });
  }
}
