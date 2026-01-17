import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEuroSign,
  faBaby,
  faHome,
  faUserShield,
  faBan,
  faUmbrella,
  faHouse,
  faVideo,
  faBicycle,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Map string icon names to FontAwesome icon objects
const iconMap: Record<string, IconDefinition> = {
  "fas fa-euro-sign": faEuroSign,
  "fas fa-baby": faBaby,
  "fas fa-home": faHome,
  "fas fa-user-shield": faUserShield,
  "fas fa-umbrella": faUmbrella,
  "fas fa-house": faHouse,
  "fas fa-video": faVideo,
  "fas fa-bicycle": faBicycle,
};

export default function FeatureIcon({
  icon,
  isPresent,
}: {
  icon: string;
  isPresent: boolean | null;
}) {
  if (isPresent === null) {
    return null;
  }

  const iconDefinition = iconMap[icon];

  if (!iconDefinition) {
    // Fallback to old behavior if icon not found in map
    console.warn(
      `Icon "${icon}" not found in iconMap, falling back to <i> tag`,
    );
    if (isPresent) {
      return <i className={`${icon}`}></i>;
    }
    return (
      <span className="fa-stack">
        <i className={`fa-stack-1x ${icon}`}></i>
        <i className="fa-solid fa-ban fa-stack-2x text-red-900"></i>
      </span>
    );
  }

  if (isPresent) {
    return <FontAwesomeIcon icon={iconDefinition} />;
  }

  return (
    <span className="fa-stack">
      <FontAwesomeIcon icon={iconDefinition} className="fa-stack-1x" />
      <FontAwesomeIcon icon={faBan} className="fa-stack-2x text-red-900" />
    </span>
  );
}
