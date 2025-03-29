"use client";

import dynamic from "next/dynamic";

export const LazyShareAppMenuItem = dynamic(
  () => import("../components/ShareAppMenuItem"),
  {
    ssr: false,
    loading: () => (
      <span className="loading loading-ring w-1/4 text-primary"></span>
    ),
  }
);
