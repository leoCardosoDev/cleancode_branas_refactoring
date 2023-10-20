import AccountGateway, { Driver, Passenger } from "../../application/gateway/account_gateway";
import HttpClient from "../http/http_client";

export default class AccountGatewayHttp implements AccountGateway {
  constructor (readonly httpClient: HttpClient) {
	}
	
	getPassenger(passengerId: string): Promise<Passenger> {
		return this.httpClient.get(`http://localhost:3002/passengers/${passengerId}`);
	}

	getDriver(driverId: string): Promise<Driver> {
		return this.httpClient.get(`http://localhost:3002/drivers/${driverId}`);
	}

	createPassenger(input: any): Promise<any> {
		return this.httpClient.post(`http://localhost:3002/passengers`, input);
	}

	createDriver(input: any): Promise<any> {
		return this.httpClient.post("http://localhost:3002/drivers", input);
	}

}
