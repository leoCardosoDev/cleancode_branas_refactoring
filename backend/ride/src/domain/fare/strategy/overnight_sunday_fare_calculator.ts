import Segment from "../../ride/segment";
import FareCalculator from "./fare_calculator";

export default class OvernightSundayFareCalculator implements FareCalculator {
  FARE = 5;
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}
