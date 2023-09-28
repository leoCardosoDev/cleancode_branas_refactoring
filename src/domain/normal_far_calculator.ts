import FareCalculator from "./fare_calculator";
import Segment from "./segment";

export default class NormalFareCalculator implements FareCalculator {
  FARE = 2.1;
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}
