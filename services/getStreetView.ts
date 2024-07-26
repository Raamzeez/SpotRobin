import { LatLng } from "react-native-maps";

const getStreetView = async ({
  longitude,
  latitude,
}: LatLng): Promise<string | null> => {
  try {
    const streetViewImage = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${latitude},${longitude}&fov=80&heading=70&pitch=0&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    return streetViewImage;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getStreetView;
