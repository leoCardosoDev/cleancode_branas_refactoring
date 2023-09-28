import Segment from "../ride/segment";
import FareCalculator from "./fare_calculator";

export default class OvernightFareCalculator implements FareCalculator {
  FARE = 3.9;
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}
