import { InvalidatedProjectKind } from "typescript";
import UsecaseFactory from "../../application/factory/usecase_factory";
import Registry from "../dependency_injection/register";
import HttpServer from "./http_server";
import CalculateRide from "../../application/usecase/calculate_ride";
import inject from "../dependency_injection/inject";

export default class MainController {
  @inject('calculateRide')
  calculateRide?: CalculateRide

  constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
    httpServer.on("post", "/calculate_ride", async (params: any, body: any) => {
      const output = await this.calculateRide?.execute(body)
      return output;
    });

    httpServer.on("post", "/request_ride", async function (params: any, body: any) {
      const output = await usecaseFactory.createRequestRide().execute(body)
      return output;
    });
  }
}
