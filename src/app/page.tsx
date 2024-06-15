import dynamic from "next/dynamic";
import { getStations } from "@/lib/stations";
import { getToiletsFromOSM } from "@/lib/toilets";
import {
  BicycleParking,
  getBicycleParkingsFromOSM,
} from "@/lib/bicycleParking";

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
  const toilets = await getToiletsFromOSM();
  const bicycleParkings = await getBicycleParkingsFromOSM();
  return (
    <main className="flex flex-1">
      <LazyMap
        className="flex-auto"
        stations={stations}
        toilets={toilets}
        bicycleParkings={bicycleParkings}
      ></LazyMap>
    </main>
  );
}
