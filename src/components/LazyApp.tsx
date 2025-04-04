"use client";

import dynamic from "next/dynamic";

export const LazyApp = dynamic(() => import("../components/App"), {
  ssr: false,
  loading: () => (
    <div className="flex w-full items-center justify-center">
      <span className="loading loading-ring w-1/4 text-primary"></span>
    </div>
  ),
});
