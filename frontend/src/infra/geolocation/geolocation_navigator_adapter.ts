import Coord from "../../domain/coord";
import GeoLocation from "./geolocation";

export default class GeoLocationNavigatorAdapter implements GeoLocation {
  async getCoord(): Promise<Coord> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(function (position: any){
        resolve(new Coord(position.coords.latitude, position.coords.longitude))
      })
    })
  }
}
