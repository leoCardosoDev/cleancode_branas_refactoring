export default class Segment {
  constructor(readonly distance: number, readonly date: Date) {
    if(!this.isValidDate()) throw new Error("Invalid Date");
  }
  isOvernight() {
    return this.date.getHours() >= 22 || this.date.getHours() <= 6
  }
  
  isSunday() {
    return this.date.getDay() === 0;
  }

  isValidDate() {
    return this.date && this.date instanceof Date && this.date.toString() !== "Invalid Date";
  }
}
