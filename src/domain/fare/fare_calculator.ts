import Segment from "../ride/segment";

export default interface FareCalculator {
  calculate(segment: Segment): number;
}
