import dynamic from "next/dynamic";
import StationMarkers from "@/components/StationMarkers";
import { getStations } from "@/lib/stations";

const LazyMap = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex w-full items-center justify-center">
      <span className="loading loading-ring w-1/4 text-primary"></span>
    </div>
  ),
});
export default async function Home() {
  const stations = (await getStations()).stations;
  return (
    <main className="flex flex-1">
      <LazyMap className="flex-auto" stations={stations}></LazyMap>
    </main>
  );
}
