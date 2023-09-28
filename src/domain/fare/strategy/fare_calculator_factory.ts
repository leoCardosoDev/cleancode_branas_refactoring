import Segment from "../../ride/segment";
import NormalFareCalculator from "./normal_far_calculator";
import OvernightSundayFareCalculator from "./overnight_sunday_fare_calculator";
import OvernightFareCalculator from "./overnitght_fare_calculator";
import SundayFareCalculator from "./sunday_fare_calculator";

export default class FareCalculatorFactory {
  static create(segment: Segment) {
    if (segment.isOvernight() && !segment.isSunday()) {
      return new OvernightFareCalculator();
    }
    if (segment.isOvernight() && segment.isSunday()) {
      return new OvernightSundayFareCalculator();
    }
    if (!segment.isOvernight() && segment.isSunday()) {
      return new SundayFareCalculator();
    }
    if (!segment.isOvernight() && !segment.isSunday()) {
      return new NormalFareCalculator();
    }
    throw new Error("Invalid segment")
  }
}
