import axios from "axios";
import { LatLng } from "react-native-maps";
import PlaceInfo from "../models/PlaceInfo";

const getPlaceInfo = async ({
  longitude,
  latitude,
}: LatLng): Promise<PlaceInfo | null> => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const name: string = response.data.results[0].formatted_address;
    const image: string = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${latitude},${longitude}&fov=80&heading=70&pitch=0&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    const coordinate: LatLng = { latitude, longitude };
    const info: PlaceInfo = { name, image, coordinate };
    return info;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getPlaceInfo;
