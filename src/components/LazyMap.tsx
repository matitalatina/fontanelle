"use client";

import dynamic from "next/dynamic";

export const LazyMap = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex w-full items-center justify-center">
      <span className="loading loading-ring w-1/4 text-primary"></span>
    </div>
  ),
});
