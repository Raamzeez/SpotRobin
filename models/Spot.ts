import { LatLng } from "react-native-maps";

interface Spot {
  id: number;
  elapsed: string;
  coordinate: LatLng;
  name: string;
  image?: string;
  parked?: boolean;
}

export default Spot;
