import Coord from "../distance/coord";
import DistanceCalculator from "../distance/distance_calculator";
import FareCalculatorHandler from "../fare/chain_of_responsability/fare_calculator_handler";
import NormalFareCalculatorHandler from "../fare/chain_of_responsability/normal_fare_calculator_handler";
import OvernightFareCalculatorHandler from "../fare/chain_of_responsability/overnight_fare_calculator_handler";
import OvernightSundayFareCalculatorHandler from "../fare/chain_of_responsability/overnight_sunday_fare_calculator_handler";
import SundayFareCalculatorHandler from "../fare/chain_of_responsability/sunday_fare_calculator_handler";
import UUIDGenetator from "../person/uuid_generator";
// import FareCalculatorFactory from "../fare/strategy/fare_calculator_factory";
import Position from "./position";
import Segment from "./segment";
 
export default class Ride {
  positions: Position[];
  MIN_PRICE = 10;
  fareCalculator: FareCalculatorHandler;
  
  constructor(readonly rideId: string, readonly passengerId: string, readonly from: Coord, readonly to: Coord, readonly status: string, readonly requestDate: Date) {
    this.positions = [];
    const overnightSundayCalculatorHandler = new OvernightSundayFareCalculatorHandler();
    const sundayFareCalculatorHnadler = new SundayFareCalculatorHandler(overnightSundayCalculatorHandler);
    const overnightFareCalculatorHandler = new OvernightFareCalculatorHandler(sundayFareCalculatorHnadler);
    this.fareCalculator = new NormalFareCalculatorHandler(overnightFareCalculatorHandler);
  }

  addPosition(lat: number, long: number, date: Date) {
    this.positions.push(new Position(lat, long, date));
  }
  
  calculate () {
    let price = 0;
    for (const [index, position] of this.positions.entries()) {
      const nextPosition = this.positions[index + 1];
      if(!nextPosition) break;
      const distance = DistanceCalculator.calculate(position.coord, nextPosition.coord);
      const segment = new Segment(distance, nextPosition.date);
      // const fareCalculator = FareCalculatorFactory.create(segment);
      // price += fareCalculator.calculate(segment);
      price += this.fareCalculator.handle(segment);
    }
    return price = (price < this.MIN_PRICE) ? this.MIN_PRICE : price;
  }

  static create (passengerId: string, from: Coord, to: Coord, requestDate = new Date()) {
    const rideId = UUIDGenetator.create();
    const status = "requested";
    return new Ride(rideId, passengerId, from, to, status, requestDate);
  }
}
