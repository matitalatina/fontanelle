import { getStations } from "@/lib/stations";
import StationMarker from "./StationMarker";

export default async function StationMarkers() {
  const markers = (await getStations()).stations.map((station) => (
    <StationMarker station={station} key={station.id} />
  ));
  return <>{markers}</>;
}
