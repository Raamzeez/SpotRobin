import spots from "../dummy";
import Spot from "../models/Spot";

const leavingSpot = (spot: Spot) => {
  spots.filter((s) => s.id === spot.id)[0].parked = false;
};

export default leavingSpot;
