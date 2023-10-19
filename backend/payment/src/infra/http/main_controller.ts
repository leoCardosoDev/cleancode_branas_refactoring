import { InvalidatedProjectKind } from "typescript";
import UsecaseFactory from "../../application/factory/usecase_factory";
import Registry from "../dependency_injection/register";
import HttpServer from "./http_server";
import CalculateRide from "../../application/usecase/calculate_ride";
import inject from "../dependency_injection/inject";
import CreatePassenger from "../../application/usecase/create_passenger";

export default class MainController {
  @inject('calculateRide')
  calculateRide?: CalculateRide
  @inject('createPassenger')
  createPassenger?: CreatePassenger


  constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
    httpServer.on("post", "/calculate_ride", async (params: any, body: any) => {
      const output = await this.calculateRide?.execute(body)
      return output;
    });
    
    httpServer.on("post", "/passengers", async (params: any, body: any) => {
      const output = await this.createPassenger?.execute(body)
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
