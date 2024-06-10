"use client";

import { useEffect, useState } from "react";

export type LatLng = {
  lat: number;
  lng: number;
};

export default function useLocation() {
  const [location, setLocation] = useState<LatLng | null>(null);
  const onSuccess = (position: GeolocationPosition) => {
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  const onError = (error: GeolocationPositionError) => console.error(error);
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  };
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return;
    }
    // const id = navigator.geolocation.watchPosition(onSuccess, onError, {
    //   enableHighAccuracy: true,
    // });

    // return () => navigator.geolocation.clearWatch(id);
  }, []);
  return { location, getCurrentLocation };
}
