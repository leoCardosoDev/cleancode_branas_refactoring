import Ride from "../ride";
import RideStatus from "./ride_status";

export default class CompletedRideStatus extends RideStatus {

  value: string;

  constructor(ride: Ride) {
    super(ride);
    this.value = "completed"

  }

  request(): void {
    throw new Error("Invalid status");
  }

  accept(): void {
    throw new Error("Invalid status");
  }

  start(): void {
    throw new Error("Invalid status");
  }

  end(): void {
    throw new Error("Invalid status");
  }

}
