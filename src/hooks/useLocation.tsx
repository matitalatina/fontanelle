"use client";

import { useCallback, useEffect, useState } from "react";

export type LatLng = {
  lat: number;
  lng: number;
};

type LocationSuccess = {
  location: LatLng;
  updatedAt: Date;
  status: "success";
};

type LocationError = {
  status: "error";
  code: number;
};

type LocationLoading = {
  status: "loading";
};

export type LocationState = LocationSuccess | LocationError | LocationLoading;

export default function useLocation() {
  const [locationState, setLocationState] = useState<LocationState>({
    status: "loading",
  });
  const onSuccess = (position: GeolocationPosition) => {
    setLocationState({
      location: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      updatedAt: new Date(),
      status: "success",
    });
  };
  const onError = (error: GeolocationPositionError) => {
    console.error(error);
    setLocationState({
      status: "error",
      code: error.code,
    });
  };

  const getCurrentLocation = useCallback(() => {
    setLocationState({ status: "loading" });
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return;
    }
    getCurrentLocation();
    // const id = navigator.geolocation.watchPosition(onSuccess, onError, {
    //   enableHighAccuracy: true,
    // });

    // return () => navigator.geolocation.clearWatch(id);
  }, [getCurrentLocation]);
  return { locationState, getCurrentLocation };
}
