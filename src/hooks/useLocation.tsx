"use client";

import { useCallback, useEffect, useState } from "react";

export type LatLng = {
  lat: number;
  lng: number;
};

type LocationSuccess = {
  location: LatLng;
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
  const [locationState, setLocationState] = useState<LocationState>(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by the browser");
      return {
        status: "error",
        code: GeolocationPositionError.POSITION_UNAVAILABLE,
      };
    }
    return {
      status: "loading",
    };
  });

  const onSuccess = (position: GeolocationPosition) => {
    setLocationState({
      location: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      status: "success",
    });
  };
  const onError = (error: GeolocationPositionError) => {
    console.error(JSON.stringify(error));
    setLocationState({
      status: "error",
      code: error.code,
    });
  };

  const startGetLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 10000,
    });
  }, []);

  const getCurrentLocation = useCallback(() => {
    setLocationState({ status: "loading" });
    startGetLocation();
  }, [startGetLocation]);

  useEffect(() => {
    startGetLocation();
  }, [startGetLocation]);

  return { locationState, getCurrentLocation };
}
