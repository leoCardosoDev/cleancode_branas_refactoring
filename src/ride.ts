import Segment from "./segment";

export default class Ride {
  segments: Segment[];
  constructor(){
    this.segments = [];
  }
  addSegment(distance: number, date: Date) {
    this.segments.push(new Segment(distance, date));
  }
  calculate () {
    let price =0;
    for (const segment of this.segments) {
      if (segment.isOvernight() && !segment.isSunday()) {
        price += segment.distance * 3.90;
      }
      if (segment.isOvernight() && segment.isSunday()) {
        price += segment.distance * 5;
      }
      if (!segment.isOvernight() && segment.isSunday()) {
        price += segment.distance * 2.9;
      }
      if (!segment.isOvernight() && !segment.isSunday()) {
        price += segment.distance * 2.10;
      }
    }
    return price = (price < 10) ? 10 : price;
  }
}
