import Segment from "../../ride/segment";
import FareCalculatorHandler from "./fare_calculator_handler";

export default class OvernightFareCalculatorHandler extends FareCalculatorHandler {
  FARE = 3.9;

  handle(segment: Segment): number {
    if(segment.isOvernight() && !segment.isSunday()) {
      return this.calculate(segment);
    }
    if(!this.next) throw new Error("End of chain");
    return this.next.handle(segment);
  }
}
