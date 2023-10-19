import Coord from "../../domain/coord";

export default interface GeoLocation {
  getCoord (): Promise<Coord>
}
