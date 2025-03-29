import { LazyMap } from "@/components/LazyMap";
import { LazyShareAppMenuItem } from "@/components/LazyShareAppMenuItem";

export default async function Home() {
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
            stations={[]}
            toilets={[]}
            bicycleParkings={[]}
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
