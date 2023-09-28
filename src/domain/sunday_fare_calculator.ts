import FareCalculator from "./fare_calculator";
import Segment from "./segment";

export default class SundayFareCalculator implements FareCalculator {
  FARE = 2.9;
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}
