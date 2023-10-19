import Segment from "../../ride/segment";
import FareCalculator from "./fare_calculator";

export default class NormalFareCalculator implements FareCalculator {
  FARE = 2.1;
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}
