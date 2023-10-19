import Segment from "../../ride/segment";

export default abstract class FareCalculatorHandler {
  abstract FARE: number;

  constructor(readonly next?: FareCalculatorHandler) {}

  abstract handle(segment: Segment): number;

  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }

}
