import Coord from "./coord"

export default class Ride {
  from: Coord
  to: Coord

  constructor(fromLat: number, fromLong: number, toLat:number, toLong: number) {
    this.from = new Coord(fromLat, fromLong)
    this.to = new Coord(toLat, toLong)
  }

  static create(builder: RideBuilder) {
    return new Ride(builder.fromLat, builder.fromLong, builder.toLat, builder.toLong)
  }

}

export class RideBuilder {
  fromLat = 0
  fromLong = 0
  toLat = 0
  toLong = 0

  build() {
    return Ride.create(this)
  }
}
