import UsecaseFactory from "../../application/factory/usecase_factory";
import HttpServer from "./http_server";

export default class MainController {
  constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
    httpServer.on("post", "/calculate_ride", async function (params: any, body: any) {
      const output = await usecaseFactory.createCalculateRide().execute(body)
      return output;
    });
    
    httpServer.on("post", "/passengers", async function(params: any, body: any) {
      const output = await usecaseFactory.createCreatePassenger().execute(body)
      return output;
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

    httpServer.on("post", "/request_ride", async function (params: any, body: any) {
      const output = await usecaseFactory.createRequestRide().execute(body)
      return output;
    });
  }
}
