import DistanceCalculator from "./distance_calculator";
import Position from "./position";
import Segment from "./segment";

export default class Ride {
  positions: Position[];
  OVERNIGHT_FARE = 3.90;
  OVERNIGHT_SUNDAY_FARE = 5;
  SUNDAY_FARE = 2.90;
  NORMAL_FARE = 2.10;
  MIN_PRICE = 10;
  
  constructor() {
    this.positions = [];
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
      if (segment.isOvernight() && !segment.isSunday()) {
        price += segment.distance * this.OVERNIGHT_FARE;
      }
      if (segment.isOvernight() && segment.isSunday()) {
        price += segment.distance * this.OVERNIGHT_SUNDAY_FARE;
      }
      if (!segment.isOvernight() && segment.isSunday()) {
        price += segment.distance * this.SUNDAY_FARE;
      }
      if (!segment.isOvernight() && !segment.isSunday()) {
        price += segment.distance * this.NORMAL_FARE;
      }
    }
    return price = (price < this.MIN_PRICE) ? this.MIN_PRICE : price;
  }
}
