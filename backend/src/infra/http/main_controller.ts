import CalculateRide from "../../application/usecase/calculate_ride";
import CreateDriver from "../../application/usecase/create_driver";
import CreatePassenger from "../../application/usecase/create_passenger";
import GetDriver from "../../application/usecase/get_driver";
import GetPassenger from "../../application/usecase/get_passenger";
import RequestRide from "../../application/usecase/request_ride";
import HttpServer from "./http_server";

export default class MainController {
  constructor(
    httpServer: HttpServer,
    calculateRide: CalculateRide,
    createPassenger: CreatePassenger,
    getPassenger: GetPassenger,
    createDriver: CreateDriver,
    getDriver: GetDriver,
    requestRide: RequestRide
  ) {
    httpServer.on("post", "/calculate_ride", async function (params: any, body: any) {
      const output = await calculateRide.execute(body)
      return output;
    });
    
    httpServer.on("post", "/passengers", async function(params: any, body: any) {
      const output = await createPassenger.execute(body)
      return output;
    });
    
    httpServer.on("get", "/passengers/:{passengerId}", async function(params: any, body: any){
      const output = await getPassenger.execute({passengerId: params.passengerId});
      return output;
    });
    
    httpServer.on("post", "/drivers", async function(params: any, body: any) {
      const output = await createDriver.execute(body)
      return output;
    });
    
    httpServer.on("get", "/drivers/:{driverId}", async function(params: any, body: any){
      const output = await getDriver.execute({driverId: params.driverId});
      return output;
    });

    httpServer.on("post", "/request_ride", async function (params: any, body: any) {
      const output = await requestRide.execute(body)
      return output;
    });
  }
}
