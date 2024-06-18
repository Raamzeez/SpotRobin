import { LatLng } from "react-native-maps";

interface Spot {
  id: number;
  elapsed: string;
  coordinate: LatLng;
  name: string;
  image?: string;
}

export default Spot;
