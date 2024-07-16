import spots from "../dummy";
import Spot from "../models/Spot";

const parkSpot = (spot: Spot) => {
  spots.filter((s) => s.id === spot.id)[0].parked = true;
};

export default parkSpot;
