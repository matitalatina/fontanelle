import dynamic from "next/dynamic";
import { getStations } from "@/lib/stations";
import { getToiletsFromOSM } from "@/lib/toilets";

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
  return (
    <main className="flex flex-1">
      <LazyMap
        className="flex-auto"
        stations={stations}
        toilets={toilets}
      ></LazyMap>
    </main>
  );
}
