"use client";

import { Marker, useMapEvents } from "react-leaflet";
import { Icon, PinSquarePanel } from "leaflet-extra-markers";
import { Marker as LeafletMarker } from "leaflet";
import { createMarkerIconHTML } from "@/lib/marker-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "@/i18n/navigation";
import { useCallback, useEffect, useRef } from "react";
import { isDevMode } from "@/lib/dev-mode";

const redMarker = new Icon({
  contentHtml: createMarkerIconHTML(faUser),
  color: "var(--color-person-content)",
  contentColor: "var(--color-person)",
  accentColor: "var(--color-person)",
  svg: PinSquarePanel,
});

const LONG_PRESS_MS = 600;
const MOVE_TOLERANCE_PX = 10;

export default function PersonMarker({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const router = useRouter();
  const markerRef = useRef<LeafletMarker>(null);
  const timerRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const cancelPress = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const beginPress = useCallback(
    (clientX: number, clientY: number) => {
      cancelPress();

      function cleanup() {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        cleanupRef.current = null;
        cancelPress();
      }

      function onMove(event: PointerEvent) {
        if (
          Math.abs(event.clientX - clientX) > MOVE_TOLERANCE_PX ||
          Math.abs(event.clientY - clientY) > MOVE_TOLERANCE_PX
        ) {
          cleanup();
        }
      }

      function onUp() {
        cleanup();
      }

      cleanupRef.current = cleanup;
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);

      timerRef.current = window.setTimeout(() => {
        cleanup();
        if (isDevMode()) {
          router.push({
            pathname: "/contribute",
            query: { lat: lat.toString(), lng: lng.toString() },
          });
        }
      }, LONG_PRESS_MS);
    },
    [cancelPress, router, lat, lng],
  );

  useEffect(() => {
    const element = markerRef.current?.getElement();

    function onPointerDown(event: PointerEvent) {
      beginPress(event.clientX, event.clientY);
    }

    element?.addEventListener("pointerdown", onPointerDown);

    return () => {
      element?.removeEventListener("pointerdown", onPointerDown);
      cleanupRef.current?.();
      cancelPress();
    };
  }, [beginPress, cancelPress]);

  useMapEvents({
    movestart: cancelPress,
    zoomstart: cancelPress,
  });

  return <Marker ref={markerRef} position={[lat, lng]} icon={redMarker} />;
}
