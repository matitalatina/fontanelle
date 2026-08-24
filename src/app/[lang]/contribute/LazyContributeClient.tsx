"use client";

import dynamic from "next/dynamic";

const LazyContributeClient = dynamic(() => import("./ContributeClient"), {
  ssr: false,
  loading: () => (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body items-center py-12">
        <span className="loading loading-ring loading-lg text-primary" />
      </div>
    </div>
  ),
});

export default LazyContributeClient;
