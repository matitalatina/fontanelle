"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFaucetDrip,
  faRestroom,
  faParking,
  faFutbol,
  faRightToBracket,
  faLocationDot,
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import type { LatLng } from "@/hooks/useLocation";
import ContributeMiniMap from "./ContributeMiniMap";
import type { PoiType } from "@/lib/osm/types";

type OsmUser = { id: number; displayName: string };

type SubmitResult = { nodeId: number; changesetId: number; osmUrl: string };

type PoiLabelKey =
  | "types.fountain"
  | "types.toilet"
  | "types.bicycleParking"
  | "types.playground";

const POI_OPTIONS: Array<{
  value: PoiType;
  icon: IconDefinition;
  labelKey: PoiLabelKey;
  bg: string;
  fg: string;
}> = [
  {
    value: "fountain",
    icon: faFaucetDrip,
    labelKey: "types.fountain",
    bg: "bg-fountain",
    fg: "text-fountain-content",
  },
  {
    value: "toilet",
    icon: faRestroom,
    labelKey: "types.toilet",
    bg: "bg-toilet",
    fg: "text-toilet-content",
  },
  {
    value: "bicycle_parking",
    icon: faParking,
    labelKey: "types.bicycleParking",
    bg: "bg-bicycle",
    fg: "text-bicycle-content",
  },
  {
    value: "playground",
    icon: faFutbol,
    labelKey: "types.playground",
    bg: "bg-playground",
    fg: "text-playground-content",
  },
];

export default function ContributeClient({
  initialCoords,
  authError,
}: {
  initialCoords: LatLng | null;
  authError: string | null;
}) {
  const t = useTranslations("contribute");
  const [authStatus, setAuthStatus] = useState<"checking" | "login" | "form">(
    "checking",
  );
  const [user, setUser] = useState<OsmUser | null>(null);
  const [coords, setCoords] = useState<LatLng | null>(initialCoords);
  const [poiType, setPoiType] = useState<PoiType>("fountain");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/v1/osm/me")
      .then(async (response) => {
        if (cancelled) return;
        if (response.ok) {
          setUser(await response.json());
          setAuthStatus("form");
        } else {
          setAuthStatus("login");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAuthStatus("login");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogin = () => {
    const url = new URL("/api/v1/osm/auth/start", window.location.origin);
    url.searchParams.set(
      "returnTo",
      window.location.pathname + window.location.search,
    );
    window.location.assign(url.toString());
  };

  const handleLogout = async () => {
    await fetch("/api/v1/osm/logout", { method: "POST" });
    setUser(null);
    setAuthStatus("login");
  };

  const handleSubmit = async () => {
    if (coords === null || submitting) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      const response = await fetch("/api/v1/osm/poi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: coords.lat,
          lng: coords.lng,
          type: poiType,
        }),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      setResult((await response.json()) as SubmitResult);
    } catch (error) {
      console.error(error);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (authStatus === "checking") {
    return (
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body items-center py-12">
          <span className="loading loading-ring loading-lg text-primary" />
        </div>
      </div>
    );
  }

  if (authStatus === "login") {
    return (
      <div className="flex flex-col gap-4">
        {authError && (
          <div className="alert alert-error">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <span>{t("authFailed")}</span>
          </div>
        )}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center py-12 gap-6 text-center">
            <h2 className="card-title text-xl">
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="text-primary mr-2"
              />
              {t("loginTitle")}
            </h2>
            <p className="max-w-md">{t("loginDescription")}</p>
            <button
              type="button"
              className="btn btn-primary btn-wide"
              onClick={handleLogin}
            >
              <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
              {t("loginButton")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {authError && (
        <div className="alert alert-error">
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <span>{t("authFailed")}</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        {user && (
          <span className="text-sm opacity-80">
            {t("loggedInAs", { name: user.displayName })}
          </span>
        )}
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={handleLogout}
        >
          {t("logout")}
        </button>
      </div>

      {result ? (
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center gap-4 text-center">
            <h2 className="card-title text-xl">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-success mr-2"
              />
              {t("successTitle")}
            </h2>
            <a
              href={result.osmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-wide"
            >
              <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
              {t("viewOnOsm")}
            </a>
            <button
              type="button"
              className="btn btn-primary btn-wide"
              onClick={() => setResult(null)}
            >
              {t("addAnother")}
            </button>
          </div>
        </div>
      ) : (
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="card-title text-lg">{t("positionTitle")}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm opacity-70">{t("latitude")}</span>
                  <p className="font-mono font-bold">
                    {coords ? coords.lat.toFixed(6) : "-"}
                  </p>
                </div>
                <div>
                  <span className="text-sm opacity-70">{t("longitude")}</span>
                  <p className="font-mono font-bold">
                    {coords ? coords.lng.toFixed(6) : "-"}
                  </p>
                </div>
              </div>
              {!initialCoords && (
                <div className="alert alert-warning py-2">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  <span>{t("missingCoords")}</span>
                </div>
              )}
              <ContributeMiniMap
                position={coords}
                poiType={poiType}
                onChange={setCoords}
              />
              <p className="text-sm opacity-70 text-center">
                {t("minimapHint")}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="card-title text-lg">{t("typeTitle")}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {POI_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPoiType(option.value)}
                    className={`btn h-auto py-3 flex-col gap-2 ${
                      poiType === option.value
                        ? "btn-primary ring-2 ring-primary/50"
                        : "btn-outline"
                    }`}
                    aria-pressed={poiType === option.value}
                  >
                    <span
                      className={`w-9 h-9 rounded-md flex items-center justify-center ${option.bg}`}
                    >
                      <FontAwesomeIcon
                        icon={option.icon}
                        className={`${option.fg}`}
                      />
                    </span>
                    {t(option.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            {submitError && (
              <div className="alert alert-error">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                <span>{t("submitError")}</span>
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary btn-block"
              disabled={coords === null || submitting}
              onClick={handleSubmit}
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2" />
                  {t("submitting")}
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                  {t("submit")}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
