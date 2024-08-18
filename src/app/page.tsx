import dynamic from "next/dynamic";
import { getStations } from "@/lib/stations";
import { getToiletsFromOSM } from "@/lib/toilets";
import { getBicycleParkingsFromOSM } from "@/lib/bicycleParking";

const LazyMap = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex w-full items-center justify-center">
      <span className="loading loading-ring w-1/4 text-primary"></span>
    </div>
  ),
});

const LazyShareAppMenuItem = dynamic(
  () => import("../components/ShareAppMenuItem"),
  {
    ssr: false,
    loading: () => (
      <span className="loading loading-ring w-1/4 text-primary"></span>
    ),
  }
);

export default async function Home() {
  const stations = (await getStations()).stations;
  const toilets = await getToiletsFromOSM();
  const bicycleParkings = await getBicycleParkingsFromOSM();
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-1 z-0">
        <main className="flex flex-1">
          <label
            htmlFor="my-drawer"
            className="btn drawer-button absolute top-4 left-4 w-auto bg-base-100 shadow-xl"
            style={{ zIndex: 4000 }}
          >
            <i className="fa-solid fa-bars"></i>
          </label>
          <LazyMap
            className="flex-auto"
            stations={stations}
            toilets={toilets}
            bicycleParkings={bicycleParkings}
          ></LazyMap>
        </main>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu menu-lg bg-base-200 text-base-content min-h-full w-80 p-4">
          <LazyShareAppMenuItem />
        </ul>
      </div>
    </div>
  );
}
