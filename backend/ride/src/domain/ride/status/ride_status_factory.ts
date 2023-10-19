import Ride from "../ride";
import AcceptedRideStatus from "./accepted_ride_status";
import CompletedRideStatus from "./completed_ride_status";
import InProgressRideStatus from "./in_progress_ride_status";
import RequestedRideStatus from "./requested_ride_status";

export default class RideStatusFactory {
  static create(ride: Ride, status: string) {
    if(status === "requested") {
      return new RequestedRideStatus(ride);
    }
    if(status === "accepted") {
      return new AcceptedRideStatus(ride);
    }
    if(status === "in_progress") {
      return new InProgressRideStatus(ride);
    }
    if(status === "completed") {
      return new CompletedRideStatus(ride);
    }
    throw new Error("Invalid status");
  }
}
