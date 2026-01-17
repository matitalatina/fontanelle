/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// https://github.com/yuzhva/react-leaflet-markercluster/blob/master/src/react-leaflet-markercluster.js
import { createPathComponent } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import "leaflet.markercluster";

const MarkerClusterGroup = createPathComponent(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ children: _c, ...props }, ctx) => {
    const clusterProps: { [key: string]: any } = {};
    const clusterEvents: { [key: string]: any } = {};

    // Splitting props and events to different objects
    Object.entries(props).forEach(([propName, prop]) =>
      propName.startsWith("on")
        ? (clusterEvents[propName] = prop)
        : (clusterProps[propName] = prop),
    );

    // Creating markerClusterGroup Leaflet element
    const markerClusterGroup = L.markerClusterGroup({
      ...clusterProps,
      disableClusteringAtZoom: 18,
      chunkedLoading: true,
      zoomToBoundsOnClick: true,
    });

    // Initializing event listeners
    Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
      const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
      markerClusterGroup.on(clusterEvent, callback);
    });

    return {
      instance: markerClusterGroup,
      context: { ...ctx, layerContainer: markerClusterGroup },
    };
  },
);

export default MarkerClusterGroup;
