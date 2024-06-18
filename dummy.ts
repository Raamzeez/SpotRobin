import Spot from "./models/Spot";

const spots: Spot[] = [
  {
    id: 1,
    elapsed: "5 mins ago",
    coordinate: { latitude: 37.4275, longitude: -122.1697 },
    name: "Stanford Spot 1",
  },
  {
    id: 2,
    elapsed: "10 mins ago",
    coordinate: { latitude: 37.428, longitude: -122.17 },
    name: "Stanford Spot 2",
    image:
      "https://sf-static.sixflags.com/wp-content/uploads/2023-SFGAm-PMG-web-1024x538.jpg",
  },
  {
    id: 3,
    elapsed: "15 mins ago",
    coordinate: { latitude: 37.429, longitude: -122.171 },
    name: "Stanford Spot 3",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    elapsed: "20 mins ago",
    coordinate: { latitude: 37.4265, longitude: -122.168 },
    image: "https://via.placeholder.com/150",
    name: "Stanford Spot 4",
  },
  {
    id: 5,
    elapsed: "25 mins ago",
    coordinate: { latitude: 37.43, longitude: -122.172 },
    name: "Stanford Spot 5",
    image: "https://via.placeholder.com/150",
  },
];

export default spots;
