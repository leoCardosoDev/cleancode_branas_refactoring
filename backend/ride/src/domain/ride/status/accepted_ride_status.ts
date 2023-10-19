import Ride from "../ride";
import InProgressRideStatus from "./in_progress_ride_status";
import RideStatus from "./ride_status";

export default class AcceptedRideStatus extends RideStatus {

  value: string;

  constructor(ride: Ride) {
    super(ride);
    this.value = "accepted"

  }

  request(): void {
    throw new Error("Invalid status");
  }

  accept(): void {
    throw new Error("Invalid status");
  }

  start(): void {
    this.ride.status = new InProgressRideStatus(this.ride);
  }

  end(): void {
    throw new Error("Invalid status");
  }

}
