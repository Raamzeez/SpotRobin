import spots from "../dummy";
import Spot from "../models/Spot";

const addSpot = (spot: Spot) => {
  spots.push(spot);
};

export default addSpot;
